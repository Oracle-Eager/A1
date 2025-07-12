(function() {
    // --- CONSTANTS & CONFIG ---
    const PROXIES = [
        { prefix: 'https://api.allorigins.win/raw?url=' },
        { prefix: 'https://cors.sh/?url=' },
        { prefix: 'https://proxy.cors.sh/' },
        { prefix: 'https://api.codetabs.com/v1/proxy?quest=' }
    ];
    const SUGGESTION_API_URL = 'https://ac.duckduckgo.com/ac/?type=json&q=';
    const FETCH_TIMEOUT = 15000;
    const MOBILE_USER_AGENT = 'Mozilla/5.0 (Android 10; Mobile; rv:109.0) Gecko/109.0 Firefox/115.0';
    const DESKTOP_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0';
    const SEARCH_ENGINES = {
        'brave': 'https://search.brave.com/search?q={q}&source=web',
        'duckduckgo': 'https://duckduckgo.com/?q={q}',
        'google': 'https://www.google.com/search?q={q}',
        'bing': 'https://www.bing.com/search?q={q}'
    };
    const SEARCH_ENGINE_URL_TEMPLATE = 'https://search.brave.com/search?q={q}&source=web';
    let currentSearchEngine = 'brave';
    const ADVANCED_INJECTED_SCRIPT = `<script>try{const e=()=>{const t=27,o=new Date().getFullYear()-t;document.cookie="age="+t+"; path=/",document.cookie="dob_year="+o+"; path=/",localStorage.setItem("user_age",t),localStorage.setItem("age_gate_passed","true")};e();let t=0;const o=setInterval(()=>{e(),(t+=1)>=10&&clearInterval(o)},300)}catch(e){}document.addEventListener("click",e=>{const t=e.target.closest("a");t&&t.href&&"_top"!==t.target&&(e.preventDefault(),window.parent.postMessage({type:"aperture-navigate",url:t.href},"*"))},!0),document.addEventListener("submit",e=>{const t=e.target.closest("form");if(t){e.preventDefault();if("post"===t.method.toLowerCase())return void alert("POST forms are disabled for security.");const o=new URL(t.action||window.location.href);o.search=new URLSearchParams(new FormData(t)).toString(),window.parent.postMessage({type:"aperture-navigate",url:o.href},"*")}},!0);<\/script>`;

    // --- DOM ELEMENTS ---
    const dom = { app:document.getElementById('app-container'),form:document.getElementById('search-form'),input:document.getElementById('search-input'),searchButton:document.getElementById('search-button'),searchSuggestions:document.getElementById('search-suggestions'),progressBar:document.getElementById('progress-bar'),pageViewer:document.getElementById('page-viewer'),pageViewerTopBar:document.getElementById('page-viewer-top-bar'),closeViewerButton:document.getElementById('close-viewer-button'),pageViewerBottomNav:document.getElementById('page-viewer-bottom-nav'),backButton:document.getElementById('back-button'),forwardButton:document.getElementById('forward-button'),reloadButton:document.getElementById('reload-button'),modeButton:document.getElementById('mode-button'),searchEngineButton:document.getElementById('search-engine-button'),burnHistoryButton:document.getElementById('burn-history-button'),externalLinkButton:document.getElementById('external-link-button'),screenshotButton:document.getElementById('screenshot-button'),pageUrlDisplay:document.getElementById('page-url-display'),iframe:document.getElementById('page-viewer-iframe'),pageViewerError:document.getElementById('page-viewer-error'),readerView:document.getElementById('reader-view'),modeSelectionOverlay:document.getElementById('mode-selection-overlay'),modeSelectionSheet:document.getElementById('mode-selection-sheet'),loginBypassOverlay:document.getElementById('login-bypass-overlay'),loginBypassSheet:document.getElementById('login-bypass-sheet'),loginBypassResults:document.getElementById('login-bypass-results'),searchEngineSelectionOverlay:document.getElementById('search-engine-selection-overlay'),searchEngineSelectionSheet:document.getElementById('search-engine-selection-sheet'), };

    // --- STATE MANAGEMENT ---
    let currentViewState = { url: '', mode: 'interactive', history: [], historyIndex: -1, pageHTML: '', error: null };
    let prefetchCache = {};
    let suggestionIndex = -1;

    const saveState = () => { try { localStorage.setItem('aperture_history', JSON.stringify({ history: currentViewState.history, historyIndex: currentViewState.historyIndex })); if (currentViewState.url && dom.app.classList.contains('state-page')) { sessionStorage.setItem('aperture_session', JSON.stringify({ url: currentViewState.url, mode: currentViewState.mode, searchEngine: currentSearchEngine })); } else { sessionStorage.removeItem('aperture_session'); } } catch (e) { console.error("Failed to save state:", e); } };
    const loadState = () => { try { const storedHistory = localStorage.getItem('aperture_history'); if (storedHistory) { const { history, historyIndex } = JSON.parse(storedHistory); currentViewState.history = history || []; currentViewState.historyIndex = historyIndex ?? -1; } const storedSession = sessionStorage.getItem('aperture_session'); if (storedSession) { const { url, mode, searchEngine } = JSON.parse(storedSession); if (url) { setTimeout(() => navigateTo(url, false, mode), 100); } if (searchEngine) { currentSearchEngine = searchEngine; } } } catch (e) { console.error("Failed to load state:", e); localStorage.clear(); sessionStorage.clear(); } };
    const burnHistory = () => {
        if (!confirm('Are you sure you want to permanently delete all history and session data? This action cannot be undone.')) return;
        startProgress();
        try {
            localStorage.removeItem('aperture_history');
            sessionStorage.removeItem('aperture_session');
            currentViewState = { url: '', mode: 'interactive', history: [], historyIndex: -1, pageHTML: '', error: null };
            dom.input.value = '';
            setAppState('');
        } catch (e) { console.error("Failed to burn history:", e); }
        setTimeout(finishProgress, 300);
    };

    // --- CORE ENGINE ---
    const fetchWithProxy = async (targetUrl, headers = {}) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT * PROXIES.length);

        for (const proxy of PROXIES) {
            try {
                const response = await fetch(`${proxy.prefix}${encodeURIComponent(targetUrl)}`, {
                        headers: {
                            'User-Agent': headers['User-Agent'] || MOBILE_USER_AGENT,
                            'X-Requested-With': 'XMLHttpRequest',
                            'Referer': targetUrl
                        },
                    signal: controller.signal
                });
                if (!response.ok) continue;
                const text = await response.text();
                if (/Cloudflare|hCaptcha|Verifying you are human|Checking your browser/i.test(text)) {
                    console.warn(`Proxy ${proxy.prefix} returned a block page. Trying next...`);
                    continue;
                }
                clearTimeout(timeoutId);
                return text;
            } catch (error) {
                console.error(`Proxy ${proxy.prefix} failed:`, error.name);
                if (error.name === 'AbortError') break;
            }
        }
        clearTimeout(timeoutId);
        throw new Error('All proxies failed to fetch the content. The site may be down or blocking access.');
    };
    const navigateTo = async (url, pushToHistory = true, newMode = null) => {
        if (!url) return;
        const cleanUrl = stripTrackingParams(url);
        const mode = newMode || (currentViewState.url === cleanUrl ? currentViewState.mode : 'interactive');
        setAppState('page');
        dom.iframe.style.display = 'none'; dom.readerView.style.display = 'none'; dom.pageViewerError.style.display = 'none';
        startProgress();
        try {
            const userAgent = mode === 'desktop' ? DESKTOP_USER_AGENT : MOBILE_USER_AGENT;
            const pageHTML = prefetchCache[cleanUrl] ? await prefetchCache[cleanUrl] : await fetchWithProxy(cleanUrl, { 'User-Agent': userAgent });
            delete prefetchCache[cleanUrl];

            const doc = new DOMParser().parseFromString(pageHTML, 'text/html');
            if (await detectAndBypassLogin(doc, cleanUrl)) {
                finishProgress();
                return;
            }

            currentViewState = { ...currentViewState, url: cleanUrl, mode, pageHTML, error: null };
            if (pushToHistory && currentViewState.history[currentViewState.historyIndex] !== cleanUrl) {
                currentViewState.history.splice(currentViewState.historyIndex + 1);
                currentViewState.history.push(cleanUrl);
                currentViewState.historyIndex++;
            }
            await renderPage(doc);
        } catch (error) {
            currentViewState = { ...currentViewState, url: cleanUrl, mode, pageHTML: null, error: error.message };
            renderError('Failed to Load Page', error.message, cleanUrl);
        } finally {
            finishProgress();
            saveState();
        }
    };
    const detectAndBypassLogin = async (doc, url) => {
        const hasPasswordField = doc.querySelector('input[type="password"]');
        const bodyText = doc.body.textContent.toLowerCase();
        const hasLoginKeywords = /log in|sign in|username|e-mail address/.test(bodyText);

        if (hasPasswordField && hasLoginKeywords) {
            const title = doc.title.replace(/log in|sign in|login|signin/i, '').replace(/[-|–_]/g, ' ').trim();
            const hostname = new URL(url).hostname;
            const searchQuery = `site:${hostname} ${title}`;

            toggleLoginBypassSheet(true);
            await performScopedSearch(searchQuery, dom.loginBypassResults);
            return true;
        }
        return false;
    };
    const performScopedSearch = async (query, targetElement) => {
        targetElement.innerHTML = 'Searching for public pages...';
        try {
            const searchUrl = SEARCH_ENGINE_URL_TEMPLATE.replace('{q}', encodeURIComponent(query));
            const html = await fetchWithProxy(searchUrl);
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const parsedResults = Array.from(doc.querySelectorAll('div.snippet[data-pos]')).map(result => {
                const titleEl = result.querySelector('a.snippet-title');
                const urlEl = result.querySelector('div.url');
                const descEl = result.querySelector('div.snippet-content');
                if (!titleEl || !urlEl || !descEl || !titleEl.href) return null;
                return { title: titleEl.textContent.trim(), url: titleEl.href, displayUrl: urlEl.textContent.trim(), description: descEl.textContent.trim() };
            }).filter(Boolean);

            if (parsedResults.length === 0) {
                targetElement.innerHTML = `<p style="text-align:center;padding:20px;">No public pages found for this site.</p>`;
                return;
            }
            const fragment = document.createDocumentFragment();
            parsedResults.forEach(p => {
                const item = document.createElement('div');
                item.className = 'result-item';
                item.dataset.url = p.url;
                const hostname = new URL(p.url).hostname;
                const faviconLetter = hostname.replace('www.','').charAt(0);
                item.innerHTML = `<div class="favicon" style="background-image:url(https://icons.duckduckgo.com/ip3/${hostname}.ico)">${faviconLetter}</div><div style="flex-grow:1;"><a href="javascript:void(0);" class="result-title" style="display:block;font-size:1.1em;font-weight:500;color:var(--accent-color);text-decoration:none;margin-bottom:6px;">${p.title}</a><p style="font-size:0.9em;line-height:1.5;color:var(--text-secondary-color);margin:0;">${p.description}</p></div>`;
                fragment.appendChild(item);
            });
            targetElement.innerHTML = '';
            targetElement.appendChild(fragment);
        } catch (error) {
            targetElement.innerHTML = `<p style="text-align:center;color:var(--error-color);padding:20px;">Search failed. Please try again.</p>`;
        }
    };

    // --- UI & RENDERING ---
    const startProgress = () => { dom.progressBar.style.opacity='1';dom.progressBar.style.width='0%';requestAnimationFrame(()=>{requestAnimationFrame(()=>{dom.progressBar.style.transition='width 10s cubic-bezier(0.22, 1, 0.36, 1)';dom.progressBar.style.width='90%'})}) };
    const finishProgress = () => { dom.progressBar.style.transition='width 0.3s ease-out, opacity 0.3s 0.3s ease-out';dom.progressBar.style.width='100%';dom.progressBar.style.opacity='0';setTimeout(()=>{dom.progressBar.style.transition='none';dom.progressBar.style.width='0%'},600) };
    const setAppState = (state) => { dom.app.className = `app-container state-${state}`; dom.pageViewer.classList.toggle('visible', state === 'page'); dom.pageViewerTopBar.classList.toggle('visible', state === 'page'); dom.pageViewerBottomNav.classList.toggle('visible', state === 'page'); };
    const renderError = (title, message, url) => {
        dom.iframe.style.display = 'none'; dom.readerView.style.display = 'none'; dom.iframe.srcdoc = 'about:blank';
        dom.pageViewerError.style.display = 'flex';
        dom.pageViewerError.innerHTML = `<div class="error-content"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--error-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><h2>${title}</h2><p>${message}</p><div class="error-actions"><button data-action="reload">Reload</button><button data-action="change-mode">Change Mode</button><button data-action="open-external">Open Externally</button></div></div>`;
        dom.pageViewerError.querySelector('[data-action="reload"]').onclick = () => navigateTo(currentViewState.url, false);
        dom.pageViewerError.querySelector('[data-action="change-mode"]').onclick = () => toggleModeSheet(true);
        dom.pageViewerError.querySelector('[data-action="open-external"]').onclick = () => window.open(url, '_blank', 'noopener,noreferrer');
    };
    const updateUiForState = () => {
        dom.pageUrlDisplay.textContent = currentViewState.url.replace(/^(https?:\/\/)?(www\.)?/, '');
        dom.backButton.disabled = currentViewState.historyIndex <= 0;
        dom.forwardButton.disabled = currentViewState.historyIndex >= currentViewState.history.length - 1;
        dom.modeButton.classList.toggle('active', currentViewState.mode !== 'interactive');
    };
    const renderPage = async (doc) => {
        if (currentViewState.error || !doc) return;
        const { url, mode } = currentViewState;
        updateUiForState();
        const base = doc.createElement('base'); base.href = url; doc.head.prepend(base);

        if (mode === 'reader') {
            dom.iframe.style.display = 'none'; dom.readerView.style.display = 'block';
            const readerContent = dom.readerView.querySelector('#reader-view-content');
                try {
                    const article = await Mercury.parse(url, { html: doc.documentElement.outerHTML });
                    if (article && readerContent) {
                        readerContent.innerHTML = `<h1>${article.title}</h1><div class="byline">${article.author || ''}</div>${article.content}`;
                    } else if (readerContent) {
                        readerContent.innerHTML = `<h1>Reader Mode Unavailable</h1><p>Aperture could not extract a clean article from this page.</p>`;
                    }
                } catch (e) {
                readerContent.innerHTML = `<h1>Reader Mode Unavailable</h1><p>Aperture could not extract a clean article from this page.</p>`;
            }
        } else {
            dom.readerView.style.display = 'none'; dom.iframe.style.display = 'block';
            dom.iframe.sandbox = mode === 'readonly' ? "allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin" : "allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation";
            if (mode === 'readonly') doc.querySelectorAll('script, noscript, iframe, link[rel="preload"], link[rel="prefetch"]').forEach(el => el.remove());
            doc.head.appendChild(doc.createRange().createContextualFragment(ADVANCED_INJECTED_SCRIPT));
            dom.iframe.srcdoc = doc.documentElement.outerHTML;
        }
    };
    const toggleModeSheet = (visible) => {
        dom.modeSelectionOverlay.classList.toggle('visible', visible);
        dom.modeSelectionSheet.classList.toggle('visible', visible);
        if (visible) dom.modeSelectionSheet.querySelectorAll('.mode-option').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === currentViewState.mode));
    };
    const toggleLoginBypassSheet = (visible) => {
        dom.loginBypassOverlay.classList.toggle('visible', visible);
        dom.loginBypassSheet.classList.toggle('visible', visible);
    };
    const toggleSearchEngineSheet = (visible) => {
        dom.searchEngineSelectionOverlay.classList.toggle('visible', visible);
        dom.searchEngineSelectionSheet.classList.toggle('visible', visible);
        if (visible) {
            dom.searchEngineSelectionSheet.querySelectorAll('.search-engine-option').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.engine === currentSearchEngine);
            });
        }
    };
    const stripTrackingParams = (url) => { try { const urlObj = new URL(url); const params = urlObj.searchParams; ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','fbclid','gclid','msclkid','mc_cid','mc_eid'].forEach(key => params.delete(key)); return urlObj.toString(); } catch (e) { return url; } };
    const debounce = (func, delay) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), delay); }; };

    // --- EVENT HANDLERS ---
    const takeScreenshot = () => {
        const target = currentViewState.mode === 'reader' ? dom.readerView : dom.iframe;
        html2canvas(target).then(canvas => {
            const link = document.createElement('a');
            link.download = `aperture-screenshot-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        hideSuggestions();
        const query = dom.input.value.trim();
        if (!query) return;
        let targetUrl = /^(https?:\/\/)?([\w\d\.-]+)\.([\w\.]{2,6})([\/\w \.-]*)*\/?$/.test(query)
            ? (!/^https?:\/\//i.test(query) ? 'https://' + query : query)
                : SEARCH_ENGINES[currentSearchEngine].replace('{q}', encodeURIComponent(query));
        navigateTo(targetUrl);
    };
    const hideSuggestions = () => dom.searchSuggestions.classList.remove('visible');
    const handleSearchInput = debounce(async (event) => {
        const query = event.target.value.trim();
        if (query.length < 2 || /^(https?:\/\/)/.test(query)) { hideSuggestions(); return; }
        try {
            const response = await fetch(`${SUGGESTION_API_URL}${encodeURIComponent(query)}`);
            if (!response.ok) return;
            const data = await response.json();
            if (!data || data.length === 0) { hideSuggestions(); return; }
            dom.searchSuggestions.innerHTML = data.map(s => `<div class="suggestion-item" data-query="${s.phrase}">${s.phrase}</div>`).join('');
            dom.searchSuggestions.classList.add('visible');
            suggestionIndex = -1;
        } catch (e) { hideSuggestions(); }
    }, 200);
    const handleSuggestionKeyDown = (e) => {
        const items = dom.searchSuggestions.querySelectorAll('.suggestion-item');
        if (!items.length || !dom.searchSuggestions.classList.contains('visible')) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); suggestionIndex = (suggestionIndex + 1) % items.length; }
        else if (e.key === 'ArrowUp') { e.preventDefault(); suggestionIndex = (suggestionIndex - 1 + items.length) % items.length; }
        else if (e.key === 'Enter' && suggestionIndex > -1) { e.preventDefault(); items[suggestionIndex].click(); return; }
        else if (e.key === 'Escape') { hideSuggestions(); return; }
        else { return; }
        items.forEach((item, index) => item.classList.toggle('active', index === suggestionIndex));
    };
    let lastScrollY = 0;
    const handleIframeScroll = () => {
        try {
            const iframeWin = dom.iframe.contentWindow;
            if (!iframeWin || !iframeWin.document.body) return;
            const currentScrollY = iframeWin.scrollY;
            dom.pageViewerBottomNav.classList.toggle('hidden', currentScrollY > lastScrollY && currentScrollY > 100);
            lastScrollY = currentScrollY;
        } catch (e) {}
    };

    // --- INITIALIZATION ---
    dom.form.addEventListener('submit', handleSearchSubmit);
    dom.input.addEventListener('input', handleSearchInput);
    dom.input.addEventListener('keydown', handleSuggestionKeyDown);
    dom.searchSuggestions.addEventListener('click', (e) => { const item = e.target.closest('.suggestion-item'); if (item) { dom.input.value = item.dataset.query; hideSuggestions(); dom.form.requestSubmit(); } });
    document.addEventListener('click', (e) => { if (!dom.form.contains(e.target)) hideSuggestions(); });
    dom.closeViewerButton.addEventListener('click', () => { sessionStorage.removeItem('aperture_session'); setAppState(''); });
    dom.backButton.addEventListener('click', () => { if (currentViewState.historyIndex > 0) { currentViewState.historyIndex--; navigateTo(currentViewState.history[currentViewState.historyIndex], false); } });
    dom.forwardButton.addEventListener('click', () => { if (currentViewState.historyIndex < currentViewState.history.length - 1) { currentViewState.historyIndex++; navigateTo(currentViewState.history[currentViewState.historyIndex], false); } });
    dom.reloadButton.addEventListener('click', () => navigateTo(currentViewState.url, false));
    dom.burnHistoryButton.addEventListener('click', burnHistory);
    dom.externalLinkButton.addEventListener('click', () => { if (currentViewState.url) window.open(currentViewState.url, '_blank', 'noopener,noreferrer'); });
    dom.modeButton.addEventListener('click', () => toggleModeSheet(true));
    dom.modeSelectionOverlay.addEventListener('click', () => toggleModeSheet(false));
    dom.modeSelectionSheet.addEventListener('click', (e) => { const button = e.target.closest('.mode-option'); if (button) { const newMode = button.dataset.mode; toggleModeSheet(false); if (newMode !== currentViewState.mode) navigateTo(currentViewState.url, false, newMode); } });
    dom.loginBypassOverlay.addEventListener('click', () => toggleLoginBypassSheet(false));
    dom.loginBypassResults.addEventListener('click', (e) => { const item = e.target.closest('.result-item'); if (item && item.dataset.url) { toggleLoginBypassSheet(false); navigateTo(item.dataset.url); } });
    dom.searchEngineButton.addEventListener('click', () => toggleSearchEngineSheet(true));
    dom.searchEngineSelectionOverlay.addEventListener('click', () => toggleSearchEngineSheet(false));
    dom.searchEngineSelectionSheet.addEventListener('click', (e) => {
        const button = e.target.closest('.search-engine-option');
        if (button) {
            currentSearchEngine = button.dataset.engine;
            // Update the active button state immediately
            dom.searchEngineSelectionSheet.querySelectorAll('.search-engine-option').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.engine === currentSearchEngine);
            });
            saveState(); // Persist the change immediately
            toggleSearchEngineSheet(false);
        }
    });
    dom.screenshotButton.addEventListener('click', takeScreenshot);
    window.addEventListener('message', (e) => { if (e.data?.type === 'aperture-navigate' && e.data.url) navigateTo(e.data.url); });
    dom.iframe.addEventListener('load', () => { try { dom.iframe.contentWindow.addEventListener('scroll', handleIframeScroll); } catch (e) {} });

    loadState();
    setTimeout(() => dom.input.focus(), 1200);
})();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker Registered'));
}
