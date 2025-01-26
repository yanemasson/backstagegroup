import { useEffect, useState } from "react";
import type MainPage from "../../types/mainPage.ts";

const useMainPage = () => {
    const [mainPageContent, setMainPageContent] = useState<MainPage | undefined>();

    useEffect(() => {
        const loadMainPage = async () => {
            try {
                const mainPageContentFile = import.meta.glob('/content/pages/main.md', {
                    eager: true,
                    as: 'raw'
                });

                if (Object.keys(mainPageContentFile).length === 0) {
                    console.error('No main.md file found');
                    return;
                }

                const rawContent = Object.values(mainPageContentFile)[0];
                const frontMatter = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);

                if (!frontMatter) {
                    throw new Error('Failed to parse frontmatter');
                }

                // Обновляем регулярные выражения для поддержки значений с кавычками и без
                const videoMatch = frontMatter[1].match(/video:\s*"?([^"\n]+)"?/);
                const descriptionMatch = frontMatter[1].match(/description:\s*"?([^"\n]+)"?/);

                const content: MainPage = {
                    video: videoMatch ? videoMatch[1].trim() : '',
                    description: descriptionMatch ? descriptionMatch[1].trim() : '',
                };

                setMainPageContent(content);
            } catch (error) {
                console.error('Error loading main page content:', error);
                setMainPageContent(undefined);
            }
        };
        loadMainPage();
    }, []);

    return mainPageContent;
};

export default useMainPage;
