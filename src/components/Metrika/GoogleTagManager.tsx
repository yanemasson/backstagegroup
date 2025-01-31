import { useEffect } from 'react';

interface GoogleAnalyticsProps {
    gtmId: string,
    ga4Id: string
}
interface Window {
    dataLayer: any[];
    [key: string]: any;
}

const GoogleAnalytics = ({gtmId, ga4Id}:GoogleAnalyticsProps    ) => {
    useEffect(() => {
        // GTM initialization
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
        })(window as unknown as Window, document, 'script', 'dataLayer', gtmId);
        // GA4 initialization
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(..._args: any[]) {
            window.dataLayer.push(_args);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', ga4Id);
    }, [ga4Id, gtmId]);


    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
            />
        </noscript>
    );
};

export default GoogleAnalytics;