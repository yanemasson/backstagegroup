import {useEffect, useState} from "react";
import {fetchNews, WordPressPost} from "../../../../api";
import Text, {TextVariant} from "../../../../components/Text.tsx";
import NewsCard from "../../../../components/NewsCard.tsx";
import LoadingSpinner from "../../../../components/LoadingSpinner.tsx";
import Button, {ButtonSize, ButtonVariant} from "../../../../components/Buttons/Button.tsx";
import {Link} from "react-router";

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
        <section className='w-[90vw] lg:w-full flex flex-col gap-11'>
            <h2><Text variant={TextVariant.H2}>НОВОСТИ</Text></h2>
            {newsList.map((item, index) => (
                index < 3 && <NewsCard key={item.id} post={item} />
            ))}
            <Link className='self-center' to='/news'>
                <Button className='w-[138px]' variant={ButtonVariant.shadow} size={ButtonSize.small}>Все новости</Button>
            </Link>
        </section>
    );
};

export default NewsSection;