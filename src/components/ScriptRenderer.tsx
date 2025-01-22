import {FC, useEffect} from 'react';
import DOMPurify from 'dompurify';

interface ScriptRendererProps {
    scriptContent: string;
}

const ScriptRenderer: FC<ScriptRendererProps> = ({ scriptContent }) => {
    useEffect(() => {
        const cleanHtml = DOMPurify.sanitize(scriptContent);

        const srcRegex = /src=["'](.*?)["']/g;
        const scriptSources = [...cleanHtml.matchAll(srcRegex)].map(match => match[1]);
        const inlineCode = cleanHtml.replace(/<script.*?>/g, '').replace(/<\/script>/g, '');
        const loadScripts = async () => {
            for (const src of scriptSources) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            }
            // После загрузки всех скриптов выполняем inline код
            if (inlineCode) {
                const script = document.createElement('script');
                script.text = inlineCode;
                document.body.appendChild(script);
            }
        };

        loadScripts().catch(console.error);

        // Очистка при размонтировании
        return () => {
            // Удаляем добавленные скрипты
            const scripts = document.getElementsByTagName('script');
            [...scripts].forEach(script => {
                if (scriptSources.includes(script.src) || script.text === inlineCode) {
                    script.remove();
                }
            });
        };
    }, [scriptContent]);

    return <div/>;
};

export default ScriptRenderer;
