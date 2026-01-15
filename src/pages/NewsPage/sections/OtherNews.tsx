import NewsCard from "../../../components/NewsCard";
import Text, {TextVariant} from "../../../components/Text.tsx";
import {useEffect, useState} from "react";
import {fetchPostForCategories, WordPressPost} from "../../../api";
import LoadingSpinner from "../../../components/LoadingSpinner.tsx";
import { Link } from "react-router";
import Button, {ButtonSize, ButtonVariant} from "../../../components/Buttons/Button.tsx";

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
        <div className='w-[90vw] xl:w-full flex flex-col gap-11'>
            <h2><Text variant={TextVariant.H2}>ПОХОЖИЕ НОВОСТИ</Text></h2>
                {newsList
                    .filter((item) => (item.id !== postItem.id))
                    .map((item) => (<NewsCard key={item.id} post={item} />))
                }
            <Link className='self-center' to='/news'>
                <Button className='w-[138px]' variant={ButtonVariant.shadow} size={ButtonSize.small}>Все новости</Button>
            </Link>
        </div>
    );
};

export default OtherNews;