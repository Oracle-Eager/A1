const PROXIES = [
    { prefix: 'https://api.allorigins.win/raw?url=' },
    { prefix: 'https://cors.sh/?url=' },
    { prefix: 'https://proxy.cors.sh/' },
    { prefix: 'https://api.codetabs.com/v1/proxy?quest=' },
    { prefix: 'https://a1-bug-build-bypass.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-k1d5f12s2-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-34767v1z3-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-d67w2b5bs-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-e3r7y1xzt-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-gq3o4p2j3-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-h4z1w1n1f-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-j2k3l4m5n-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-o6p7q8r9s-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-t0u1v2w3x-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-y4z5a6b7c-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-d8e9f0g1h-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-i2j3k4l5m-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-n6o7p8q9r-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-s0t1u2v3w-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-x4y5z6a7b-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-c8d9e0f1g-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-h2i3j4k5l-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-m6n7o8p9q-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-r0s1t2u3v-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-w4x5y6z7a-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-b8c9d0e1f-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-g2h3i4j5k-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-l6m7n8o9p-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-q0r1s2t3u-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-v4w5x6y7z-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-a8b9c0d1e-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-f2g3h4i5j-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-k6l7m8n9o-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-p0q1r2s3t-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-u4v5w6x7y-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-z8a9b0c1d-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-e2f3g4h5i-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-j6k7l8m9n-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-o0p1q2r3s-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-t4u5v6w7x-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-y8z9a0b1c-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-d2e3f4g5h-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-i6j7k8l9m-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-n0o1p2q3r-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-s4t5u6v7w-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-x8y9z0a1b-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-c2d3e4f5g-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-h6i7j8k9l-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-m0n1o2p3q-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-r4s5t6u7v-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-w8x9y0z1a-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-b2c3d4e5f-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-g6h7i8j9k-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-l0m1n2o3p-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-q4r5s6t7u-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-v8w9x0y1z-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-a2b3c4d5e-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-f6g7h8i9j-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-k0l1m2n3o-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-p4q5r6s7t-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-u8v9w0x1y-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-z2a3b4c5d-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-e6f7g8h9i-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-j0k1l2m3n-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-o4p5q6r7s-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-t8u9v0w1x-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-y2z3a4b5c-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-d6e7f8g9h-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-i0j1k2l3m-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-n4o5p6q7r-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-s8t9u0v1w-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-x2y3z4a5b-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-c6d7e8f9g-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-h0i1j2k3l-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-m4n5o6p7q-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-r8s9t0u1v-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-w2x3y4z5a-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-b6c7d8e9f-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-g0h1i2j3k-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-l4m5n6o7p-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-q8r9s0t1u-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-v2w3x4y5z-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-a6b7c8d9e-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-f0g1h2i3j-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-k4l5m6n7o-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-p8q9r0s1t-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-u2v3w4x5y-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-z6a7b8c9d-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-e0f1g2h3i-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-j4k5l6m7n-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-o8p9q0r1s-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-t2u3v4w5x-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-y6z7a8b9c-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-d0e1f2g3h-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-i4j5k6l7m-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-n8o9p0q1r-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-s2t3u4v5w-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-x6y7z8a9b-aperture-lab-inc.vercel.app/api/bypass?url='},
    { prefix: 'https://a1-bug-build-bypass-c0d1e2f3g-aperture-lab-inc.vercel.app/api/bypass?url='}
];
const FETCH_TIMEOUT = 10000;
const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
];

const getRandomUserAgent = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

let activeProxies = [...PROXIES];

async function checkProxies() {
    const testUrl = 'https://www.google.com';
    const checkedProxies = await Promise.all(PROXIES.map(async (proxy) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
            const response = await fetch(`${proxy.prefix}${encodeURIComponent(testUrl)}`, {
                signal: controller.signal,
                headers: { 'User-Agent': getRandomUserAgent() }
            });
            clearTimeout(timeoutId);
            if (response.ok) {
                const text = await response.text();
                if (!/Cloudflare|hCaptcha|Verifying you are human|Checking your browser/i.test(text)) {
                    return proxy;
                }
            }
        } catch (error) {
            // Ignore failed proxies
        }
        return null;
    }));

    const workingProxies = checkedProxies.filter(p => p !== null);
    if (workingProxies.length > 0) {
        activeProxies = workingProxies;
    }
}

async function fetchWithProxy(targetUrl, headers = {}) {
    const shuffledProxies = [...activeProxies].sort(() => Math.random() - 0.5);
    const fetchPromises = shuffledProxies.map(proxy => {
        return (async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
            try {
                const userAgent = headers['User-Agent'] || getRandomUserAgent();
                const response = await fetch(`${proxy.prefix}${encodeURIComponent(targetUrl)}`, {
                    headers: {
                        'User-Agent': userAgent,
                        'X-Requested-With': 'XMLHttpRequest',
                        'Referer': targetUrl
                    },
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (response.ok) {
                    const text = await response.text();
                    if (/Cloudflare|hCaptcha|Verifying you are human|Checking your browser/i.test(text)) {
                        throw new Error('CAPTCHA');
                    } else {
                        return text;
                    }
                } else {
                    throw new Error(`Proxy returned status ${response.status}`);
                }
            } catch (error) {
                console.error(`Proxy ${proxy.prefix} failed:`, error.name);
                throw error;
            }
        })();
    });

    try {
        const result = await Promise.any(fetchPromises);
        return result;
    } catch (error) {
        throw new Error('All proxies failed or were blocked.');
    }
}

// Check proxies on startup and then every 5 minutes
checkProxies();
setInterval(checkProxies, 5 * 60 * 1000);

async function detectAndBypassLogin(doc, url) {
    const hasPasswordField = doc.querySelector('input[type="password"]');
    const bodyText = doc.body.textContent.toLowerCase();
    const hasLoginKeywords = /log in|sign in|username|e-mail address/.test(bodyText);

    if (hasPasswordField && hasLoginKeywords) {
        try {
            const article = await Mercury.parse(url, { html: doc.documentElement.outerHTML });
            if (article && article.content) {
                dom.readerView.querySelector('#reader-view-content').innerHTML = `<h1>${article.title}</h1><div class="byline">${article.author || ''}</div>${article.content}`;
                dom.readerView.style.display = 'block';
                dom.iframe.style.display = 'none';
                return true;
            }
        } catch (e) {
            console.error("Failed to parse article with Mercury:", e);
        }

        const title = doc.title.replace(/log in|sign in|login|signin/i, '').replace(/[-|–_]/g, ' ').trim();
        const hostname = new URL(url).hostname;
        const searchQuery = `site:${hostname} ${title}`;

        toggleLoginBypassSheet(true);
        await performScopedSearch(searchQuery, dom.loginBypassResults);
        return true;
    }
    return false;
}
