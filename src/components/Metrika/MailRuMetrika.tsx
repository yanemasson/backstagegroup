import { useEffect } from 'react';

interface MailRuMetrikaProps {
  counterId: string;
}

type TMRItem = {
  id: string;
  type: string;
  start?: number;
  goal?: string;
  value?: unknown;
};

declare global {
  interface Window {
    _tmr: TMRItem[];
  }
}

const MailRuMetrika = ({ counterId }:MailRuMetrikaProps) => {
  useEffect(() => {
    window._tmr = window._tmr || [];
    window._tmr.push({id: counterId, type: "pageView", start: (new Date()).getTime()});
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.id = 'tmr-code';
    script.src = 'https://top-fwz1.mail.ru/js/code.js';

    const insertScript = () => {
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    };

    insertScript();
    const noscript = document.createElement('noscript');
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = `https://top-fwz1.mail.ru/counter?id=${counterId};js=na`;
    img.style.position = 'absolute';
    img.style.left = '-9999px';
    img.alt = 'Top.Mail.Ru';
    div.appendChild(img);
    noscript.appendChild(div);
    document.body.appendChild(noscript);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (noscript.parentNode) {
        noscript.parentNode.removeChild(noscript);
      }
    };
  }, [counterId]);

  return null;
};

export default MailRuMetrika;