import { useEffect, useState } from "react";
import type MainPage from "../../types/mainPage.ts";
import {parseArrayField} from "./utils/parseArrayField.ts";

const useMainPage = () => {
    const [mainPageContent, setMainPageContent] = useState<MainPage | undefined>();

    useEffect(() => {
        const loadMainPage = async () => {
            try {
                const mainPageContentFile = import.meta.glob('/public/content/pages/main.md', {
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

                const descriptionMatch = frontMatter[1].match(/description:\s*"?([^"\n]+)"?/);
                const imagesMatch = frontMatter[1].match(/images:/i) ?
                        parseArrayField(frontMatter[1], 'images') : []

                const content: MainPage = {
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
