import {useEffect, useState} from "react";
import {fetchNews, WordPressPost} from "../../../../api";
import Text, {TextVariant} from "../../../../components/Text.tsx";
import NewsCard from "../../../../components/NewsCard.tsx";
import LoadingSpinner from "../../../../components/LoadingSpinner.tsx";

const NewsSection = () => {
    const [newsList, setNewsList] = useState<WordPressPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const newsData = await fetchNews();
                setNewsList(newsData);
                setError(null);
            } catch (err) {
                setError('Не удалось загрузить новости');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div>{error}</div>;

    return (
        <section className='w-[90vw] md:w-[1166px] flex flex-col gap-[60px]'>
            <Text variant={TextVariant.H2}>НОВОСТИ</Text>
            <div className='flex flex-col gap-10 lg:gap-[50px] justify-center items-center'>
                {newsList.map((item, index) => (
                    index < 3 && <NewsCard key={item.id} post={item} />
                ))}
            </div>
        </section>
    );
};

export default NewsSection;