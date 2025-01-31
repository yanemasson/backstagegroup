import { useEffect } from 'react';

interface GoogleTagManagerProvider {
    id: string
}
interface Window {
    dataLayer: any[];
    [key: string]: any;
}

const GoogleTagManager = ({id}:GoogleTagManagerProvider) => {
    useEffect(() => {
        (function(w: Window, d: Document, s: string, l: string, i: string) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });

            const f = d.getElementsByTagName(s)[0];
            const j = d.createElement(s);
            const dl = l !== 'dataLayer' ? '&l=' + l : '';

            // Правильная типизация для HTMLScriptElement
            if (j instanceof HTMLScriptElement) {
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            }

            f.parentNode?.insertBefore(j, f);
        })(window as unknown as Window, document, 'script', 'dataLayer', id);
    }, []);

    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${id}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
            />
        </noscript>
    );
};

export default GoogleTagManager;