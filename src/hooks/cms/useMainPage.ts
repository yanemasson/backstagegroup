import { useEffect, useState } from "react";
import type MainPage from "../../types/mainPage.ts";

const useMainPage = () => {
    const [mainPageContent, setMainPageContent] = useState<MainPage | undefined>();

    const parseArrayField = (content: string, fieldName: string): string[] => {
        const regex = new RegExp(`${fieldName}:\\s*\\n((\\s{2,}-.*\\n?)*)`);
        const match = content.match(regex);
        if (match && match[1]) {
            return match[1]
                .split('\n')
                .map(line => line.trim().replace(/^-\s*/, ''))
                .filter(line => line);
        }
        return [];
    }

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
                const imagesMatch = frontMatter[1].match(/images:/i) ?
                        parseArrayField(frontMatter[1], 'images') : []

                const content: MainPage = {
                    video: videoMatch ? videoMatch[1].trim() : '',
                    description: descriptionMatch ? descriptionMatch[1].trim() : '',
                    images: imagesMatch
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
