import { useState, useEffect } from 'react';
import {Report} from "../../types/report.ts";

export const useReports = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const reportFiles = import.meta.glob('/public/content/reports/*.md', {
                    eager: true,
                    as: 'raw'
                });

                const loadedReports: Report[] = [];
                for (const path in reportFiles) {
                    const fileContent = reportFiles[path];

                    const content = fileContent.trim();

                    // Разделяем frontmatter и body
                    const frontMatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

                    if (frontMatterMatch) {
                        const frontMatter = frontMatterMatch[1];

                        // Находим позицию конца frontmatter, чтобы определить начало body
                        const frontmatterEndPos = content.indexOf('---', 4) + 3;
                        const bodyContent = content.substring(frontmatterEndPos).trim();

                        // Извлекаем данные из frontmatter
                        const idMatch = frontMatter.match(/id:\s*(.+?)(\r?\n|$)/);
                        const titleMatch = frontMatter.match(/title:\s*(.+?)(\r?\n|$)/);
                        const dateMatch = frontMatter.match(/date:\s*(.+?)(\r?\n|$)/);
                        const sourceMatch = frontMatter.match(/source:\s*(.+?)(\r?\n|$)/);
                        const videoMatch = frontMatter.match(/video:\s*(.+?)(\r?\n|$)/);

                        const id = idMatch ? idMatch[1].trim() : `review-${Date.now()}`;
                        const title = titleMatch ? titleMatch[1].trim() : '';
                        const video = videoMatch ? videoMatch[1].trim() : '';
                        let date = dateMatch ? dateMatch[1].trim() : new Date().toISOString();

                        // Преобразование даты в более простой формат, если необходимо
                        if (date.includes('T')) {
                            date = date.split('T')[0];
                        }

                        // Определяем источник
                        const sourceString = sourceMatch ? sourceMatch[1].trim() : 'site';
                        let source: Report['source'] = 'site';
                        if (sourceString && ['VK', 'TG', 'site'].includes(sourceString)) {
                            source = sourceString as Report['source'];
                        }

                        // Создаем объект отзыва
                        const review: Report = {
                            id,
                            title,
                            text: bodyContent,
                            date,
                            video,
                            source
                        };
                        loadedReports.push(review);
                    }
                }

                loadedReports.sort((a, b) => {
                    try {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    } catch (e) {
                        console.error('Ошибка при сортировке репортажей:', e);
                        return 0;
                    }
                });

                setReports(loadedReports);
            } catch (error) {
                console.error('Ошибка при загрузке репортажей:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadReports();
    }, []);


    return {
        reports,
        isLoading,
    };
};
