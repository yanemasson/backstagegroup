import {Link, useParams} from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import Article from "./sections/Article.tsx";
import TagEvents from "./sections/TagEvents.tsx";
import OtherNews from "./sections/OtherNews.tsx";
import {getDate} from "../../utils/getDate.ts";
import Text, {TextVariant} from "../../components/Text.tsx";
import {fetchCategories, fetchPost, WordPressCategory, WordPressPost} from "../../api";
import {useEffect, useState} from "react";

const NewsPage = () => {
    const {id} = useParams()
    const [post, setPost] = useState<WordPressPost>();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<WordPressCategory[]>([]);

    useEffect(() => {
        const loadPost = async () => {
            try {
                setIsLoading(true);
                const postData = await fetchPost(id);
                const optionsData = await fetchCategories()
                setPost(postData);
                setOptions(optionsData);
                setError(null);
            } catch (err) {
                setError('Не удалось загрузить пост');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadPost();
    }, [id]);



    if(isLoading) {return <LoadingSpinner/>}
    if (error) return <div>{error}</div>;
    if(!post) {return <NotFoundPage/>}

    const searchTag = () => {
        return (options.filter(item => {
            return item.id === post?.categories[0]
        })[0].name)
    }

    return (
        <div className='pt-5'>
            <Text className='text-lightgray pb-5' variant={TextVariant.CAPTION}>
                <Link className='hover:text-white transition-colors ' to={`/news/`}>Новости</Link>
                {` · `}
                <Link className='hover:text-white transition-colors ' to={`/news?tag=${encodeURIComponent(post.categories[0])}`}>
                    {`${searchTag()}`}
                </Link>
                {` · ${getDate(post.date).formattedDate} `}
            </Text>
            <div className='flex flex-col gap-[100px]'>
                <Article post={post}/>
                <TagEvents tag={searchTag()}/>
                <OtherNews postItem={post} tag={post.categories[0]}/>
            </div>
        </div>

    );
};

export default NewsPage;