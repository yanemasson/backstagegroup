import {useEffect, useState} from 'react';
import {Review} from "../../types/review.ts";

export const useReviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const reviewFiles = import.meta.glob('/public/content/reviews/*.md', {
                    eager: true,
                    as: 'raw'
                });

                const loadedReviews: Review[] = [];
                for (const path in reviewFiles) {
                    const fileContent = reviewFiles[path];
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
                        const nameMatch = frontMatter.match(/name:\s*(.+?)(\r?\n|$)/);
                        const dateMatch = frontMatter.match(/date:\s*(.+?)(\r?\n|$)/);
                        const statusMatch = frontMatter.match(/status:\s*(.+?)(\r?\n|$)/);
                        const sourceMatch = frontMatter.match(/source:\s*(.+?)(\r?\n|$)/);
                        const cityMatch = frontMatter.match(/city:\s*(.+?)(\r?\n|$)/);

                        const id = idMatch ? idMatch[1].trim() : `review-${Date.now()}`;
                        const name = nameMatch ? nameMatch[1].trim() : 'Анонимный посетитель';
                        const city = cityMatch ? cityMatch[1].trim() : '';
                        let date = dateMatch ? dateMatch[1].trim() : new Date().toISOString();

                        // Преобразование даты в более простой формат, если необходимо
                        if (date.includes('T')) {
                            date = date.split('T')[0];
                        }

                        // Определяем статус
                        let status: Review['status'] = 'pending';
                        if (statusMatch && ['pending', 'approved', 'rejected'].includes(statusMatch[1].trim())) {
                            status = statusMatch[1].trim() as Review['status'];
                        }

                        // Определяем источник
                        const sourceString = sourceMatch ? sourceMatch[1].trim() : 'site';
                        let source: Review['source'] = 'site';
                        if (sourceString && ['VK', 'TG', 'site'].includes(sourceString)) {
                            source = sourceString as Review['source'];
                        }

                        // Создаем объект отзыва
                        const review: Review = {
                            id,
                            name,
                            text: bodyContent,
                            date,
                            status,
                            source,
                            city
                        };
                        loadedReviews.push(review);
                    }
                }

                // Проверяем каждый отзыв на валидность
                const validReviews= loadedReviews.filter(review => {
                    return Boolean(review.id && review.name);
                });

                validReviews.sort((a, b) => {
                    try {
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                    } catch (e) {
                        console.error('Ошибка при сортировке отзывов:', e);
                        return 0;
                    }
                });

                setReviews(validReviews);
            } catch (error) {
                console.error('Ошибка при загрузке отзывов:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadReviews();
    }, []);

    // Получить только одобренные отзывы
    const getApprovedReviews = (): Review[] => {
        return reviews.filter(review => review.status === 'approved');
    };

    // Получить отзывы с определенным статусом
    const getReviewsByStatus = (status: Review['status']): Review[] => {
        return reviews.filter(review => review.status === status);
    };


    return {
        reviews,
        isLoading,
        getApprovedReviews,
        getReviewsByStatus,
    };
};
