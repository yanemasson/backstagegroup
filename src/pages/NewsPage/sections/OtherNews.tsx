import NewsCard from "../../../components/newsCard.tsx";
import Text, {TextVariant} from "../../../components/Text.tsx";
import {useEffect, useState} from "react";
import {fetchPostForCategories, WordPressPost} from "../../../api";
import LoadingSpinner from "../../../components/LoadingSpinner.tsx";
import { Link } from "react-router";

interface OtherNewsProps {
    tag: number;
    postItem: WordPressPost;
}

const OtherNews = ({tag, postItem}: OtherNewsProps) => {
    const [newsList, setNewsList] = useState<WordPressPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const newsData = await fetchPostForCategories(tag)
                setNewsList(newsData);
            } catch (err) {
                setError('Не удалось загрузить новости');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, [tag]);

    if (loading) {
        return <LoadingSpinner/>
    }

    if (error) {
        return error;
    }

    if (newsList.length <= 1) {
        return null
    }
    return (
        <div className='flex flex-col gap-10'>
            <Text variant={TextVariant.H2}>ПОХОЖИЕ НОВОСТИ</Text>
            <div className='flex flex-col gap-10 lg:gap-[50px] justify-center'>
                {newsList
                    .filter((item) => (item.id !== postItem.id))
                    .map((item) => (<NewsCard key={item.id} post={item} />))
                }
            </div>
            <Link className='w-32 self-center' to={`/news?tag=${encodeURIComponent(tag)}`}>
                <Text className='flex gap-1.5 items-center text-lightgray hover:text-white focus:text-white' variant={TextVariant.CAPTION}>
                    Показать еще
                    <svg width="12" height="9"
                         viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L0 0H12L6 9Z" fill="currentColor" />
                    </svg>
                </Text>
            </Link>
        </div>
    );
};

export default OtherNews;