const PROXIES = [
    { prefix: 'https://api.allorigins.win/raw?url=' },
    { prefix: 'https://cors.sh/?url=' },
    { prefix: 'https://proxy.cors.sh/' },
    { prefix: 'https://api.codetabs.com/v1/proxy?quest=' },
    { prefix: 'http://194.36.55.141:80/raw?url='},
    { prefix: 'http://104.21.53.201:80/raw?url='},
    { prefix: 'http://185.162.231.52:80/raw?url='},
    { prefix: 'http://45.131.5.113:80/raw?url='},
    { prefix: 'http://23.227.38.254:80/raw?url='},
    { prefix: 'http://66.81.247.243:80/raw?url='},
    { prefix: 'http://104.19.35.236:80/raw?url='},
    { prefix: 'http://104.25.158.141:80/raw?url='},
    { prefix: 'http://104.26.0.103:80/raw?url='},
    { prefix: 'http://104.21.21.161:80/raw?url='},
    { prefix: 'http://172.64.89.52:80/raw?url='},
    { prefix: 'http://141.193.213.179:80/raw?url='},
    { prefix: 'http://172.67.185.122:80/raw?url='},
    { prefix: 'http://104.17.82.158:80/raw?url='},
    { prefix: 'http://104.16.223.101:80/raw?url='},
    { prefix: 'http://45.131.6.220:80/raw?url='},
    { prefix: 'http://192.200.160.190:80/raw?url='},
    { prefix: 'http://45.67.214.64:80/raw?url='},
    { prefix: 'http://188.42.89.125:80/raw?url='},
    { prefix: 'http://172.64.35.158:80/raw?url='},
    { prefix: 'http://199.34.229.100:80/raw?url='},
    { prefix: 'http://170.114.46.136:80/raw?url='},
    { prefix: 'http://45.131.208.79:80/raw?url='},
    { prefix: 'http://173.245.49.150:80/raw?url='},
    { prefix: 'http://45.131.211.3:80/raw?url='},
    { prefix: 'http://185.18.250.139:80/raw?url='},
    { prefix: 'http://104.27.207.99:80/raw?url='},
    { prefix: 'http://185.174.138.249:80/raw?url='},
    { prefix: 'http://5.10.245.186:80/raw?url='},
    { prefix: 'http://172.67.221.222:80/raw?url='},
    { prefix: 'http://185.148.106.176:80/raw?url='},
    { prefix: 'http://104.18.176.252:80/raw?url='},
    { prefix: 'http://172.67.175.148:80/raw?url='},
    { prefix: 'http://147.185.161.121:80/raw?url='},
    { prefix: 'http://89.116.250.95:80/raw?url='},
    { prefix: 'http://185.176.26.239:80/raw?url='},
    { prefix: 'http://45.131.7.249:80/raw?url='},
    { prefix: 'http://194.152.44.25:80/raw?url='},
    { prefix: 'http://185.238.228.25:80/raw?url='},
    { prefix: 'http://172.67.161.250:80/raw?url='},
    { prefix: 'http://104.21.17.113:80/raw?url='},
    { prefix: 'http://172.67.3.7:80/raw?url='},
    { prefix: 'http://172.67.43.102:80/raw?url='},
    { prefix: 'http://172.64.159.95:80/raw?url='},
    { prefix: 'http://45.131.6.159:80/raw?url='},
    { prefix: 'http://185.162.228.154:80/raw?url='},
    { prefix: 'http://104.16.137.101:80/raw?url='},
    { prefix: 'http://104.21.79.192:80/raw?url='},
    { prefix: 'http://69.84.182.139:80/raw?url='},
    { prefix: 'http://172.67.151.71:80/raw?url='},
    { prefix: 'http://209.46.30.29:80/raw?url='},
    { prefix: 'http://104.16.118.200:80/raw?url='},
    { prefix: 'http://104.17.204.102:80/raw?url='},
    { prefix: 'http://141.101.121.52:80/raw?url='},
    { prefix: 'http://104.19.59.38:80/raw?url='},
    { prefix: 'http://104.19.176.188:80/raw?url='},
    { prefix: 'http://104.21.0.51:80/raw?url='},
    { prefix: 'http://45.85.119.227:80/raw?url='},
    { prefix: 'http://185.162.229.117:80/raw?url='},
    { prefix: 'http://45.131.209.228:80/raw?url='},
    { prefix: 'http://172.67.254.47:80/raw?url='},
    { prefix: 'http://62.72.166.47:80/raw?url='},
    { prefix: 'http://206.238.239.225:80/raw?url='},
    { prefix: 'http://188.114.97.92:80/raw?url='},
    { prefix: 'http://31.12.75.60:80/raw?url='},
    { prefix: 'http://104.17.6.31:80/raw?url='},
    { prefix: 'http://172.64.148.21:80/raw?url='},
    { prefix: 'http://31.12.75.120:80/raw?url='},
    { prefix: 'http://172.67.70.99:80/raw?url='},
    { prefix: 'http://104.16.1.203:80/raw?url='},
    { prefix: 'http://184.168.47.250:80/raw?url='},
    { prefix: 'http://104.27.85.21:80/raw?url='},
    { prefix: 'http://185.170.166.215:80/raw?url='},
    { prefix: 'http://185.238.228.162:80/raw?url='},
    { prefix: 'http://172.67.229.27:80/raw?url='},
    { prefix: 'http://104.25.119.200:80/raw?url='},
    { prefix: 'http://104.17.70.87:80/raw?url='},
    { prefix: 'http://103.116.7.114:80/raw?url='},
    { prefix: 'http://168.100.6.72:80/raw?url='},
    { prefix: 'http://104.25.59.181:80/raw?url='},
    { prefix: 'http://104.18.188.177:80/raw?url='},
    { prefix: 'http://141.101.123.144:80/raw?url='},
    { prefix: 'http://160.123.255.230:80/raw?url='},
    { prefix: 'http://173.245.49.95:80/raw?url='},
    { prefix: 'http://172.67.89.9:80/raw?url='},
    { prefix: 'http://147.185.161.182:80/raw?url='},
    { prefix: 'http://45.12.31.146:80/raw?url='},
    { prefix: 'http://104.17.223.84:80/raw?url='},
    { prefix: 'http://172.67.43.224:80/raw?url='},
    { prefix: 'http://104.16.1.122:80/raw?url='},
    { prefix: 'http://172.67.4.16:80/raw?url='},
    { prefix: 'http://5.10.244.6:80/raw?url='},
    { prefix: 'http://104.16.108.67:80/raw?url='},
    { prefix: 'http://185.162.230.110:80/raw?url='},
    { prefix: 'http://45.67.215.70:80/raw?url='},
    { prefix: 'http://160.153.0.0:80/raw?url='},
    { prefix: 'http://185.193.31.249:80/raw?url='},
    { prefix: 'http://104.24.205.125:80/raw?url='},
    { prefix: 'http://185.176.26.210:80/raw?url='},
    { prefix: 'http://104.16.219.95:80/raw?url='},
    { prefix: 'http://206.238.236.153:80/raw?url='},
    { prefix: 'http://45.85.118.215:80/raw?url='},
    { prefix: 'http://172.67.161.197:80/raw?url='},
    { prefix: 'http://45.12.31.102:80/raw?url='},
    { prefix: 'http://45.131.208.50:80/raw?url='},
    { prefix: 'http://104.16.235.195:80/raw?url='},
    { prefix: 'http://156.225.72.73:80/raw?url='},
    { prefix: 'http://141.193.213.46:80/raw?url='},
    { prefix: 'http://104.16.4.69:80/raw?url='},
    { prefix: 'http://172.67.91.137:80/raw?url='},
    { prefix: 'http://185.148.106.253:80/raw?url='},
    { prefix: 'http://104.17.228.10:80/raw?url='},
    { prefix: 'http://23.227.39.164:80/raw?url='},
    { prefix: 'http://104.17.59.73:80/raw?url='},
    { prefix: 'http://172.67.74.230:80/raw?url='},
    { prefix: 'https://api.duckduckgo.com/raw?url='},
    { prefix: 'https://api.bing.com/raw?url='},
    { prefix: 'https://api.google.com/raw?url='},
    { prefix: 'https://api.yahoo.com/raw?url='},
    { prefix: 'https://api.yandex.com/raw?url='},
    { prefix: 'https://api.aol.com/raw?url='},
    { prefix: 'https://api.ask.com/raw?url='},
    { prefix: 'https://api.baidu.com/raw?url='},
    { prefix: 'https://api.wolframalpha.com/raw?url='},
    { prefix: 'https://api.archive.org/raw?url='},
    { prefix: 'https://api.twitter.com/raw?url='},
    { prefix: 'https://api.facebook.com/raw?url='},
    { prefix: 'https://api.instagram.com/raw?url='},
    { prefix: 'https://api.linkedin.com/raw?url='},
    { prefix: 'https://api.reddit.com/raw?url='},
    { prefix: 'https://api.youtube.com/raw?url='},
    { prefix: 'https://api.vimeo.com/raw?url='},
    { prefix: 'https://api.dailymotion.com/raw?url='},
    { prefix: 'https://api.soundcloud.com/raw?url='},
    { prefix: 'https://api.spotify.com/raw?url='},
    { prefix: 'https://api.github.com/raw?url='},
    { prefix: 'https://api.gitlab.com/raw?url='},
    { prefix: 'https://api.bitbucket.org/raw?url='},
    { prefix: 'https://api.medium.com/raw?url='},
    { prefix: 'https://api.quora.com/raw?url='},
    { prefix: 'https://api.stackexchange.com/raw?url='},
    { prefix: 'https://api.imgur.com/raw?url='},
    { prefix: 'https://api.flickr.com/raw?url='},
    { prefix: 'https://api.pinterest.com/raw?url='},
    { prefix: 'https://api.tumblr.com/raw?url='}
];
const FETCH_TIMEOUT = 10000;
const MOBILE_USER_AGENT = 'Mozilla/5.0 (Android 10; Mobile; rv:109.0) Gecko/109.0 Firefox/115.0';
const DESKTOP_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0';

async function fetchWithProxy(targetUrl, headers = {}) {
    const shuffledProxies = [...PROXIES].sort(() => Math.random() - 0.5);

    for (const proxy of shuffledProxies) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

            const response = await fetch(`${proxy.prefix}${encodeURIComponent(targetUrl)}`, {
                headers: {
                    'User-Agent': headers['User-Agent'] || MOBILE_USER_AGENT,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Referer': targetUrl
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const text = await response.text();
                if (!/Cloudflare|hCaptcha|Verifying you are human|Checking your browser/i.test(text)) {
                    return text;
                }
            }
        } catch (error) {
            console.error(`Proxy ${proxy.prefix} failed:`, error.name);
        }
    }
    throw new Error('All proxies failed or were blocked.');
}

async function detectAndBypassLogin(doc, url) {
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
}
