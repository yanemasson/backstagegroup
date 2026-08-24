import Text, {TextVariant} from "../../components/Text.tsx";
import NewsCard from "../../components/NewsCard.tsx";
import MultiSelect from "../../components/MultiSelect.tsx";
import {useEffect, useMemo, useState} from "react";
import {fetchCategories, fetchNews, WordPressCategory, WordPressPost} from "../../api";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import {SEO} from "../../components/SEO.tsx";
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import {Chips} from "../../components/Chips.tsx";

const NewsListPage = () => {
    const [newsList, setNewsList] = useState<WordPressPost[]>([]);
    const [options, setOptions] = useState<WordPressCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<WordPressCategory[]>([]);
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('tag');

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                const [newsData, optionsData] = await Promise.all([fetchNews(), fetchCategories()]);
                setNewsList(newsData);
                setOptions(optionsData);

                if (categoryId) {
                    const categoryIdNum = parseInt(categoryId, 10);
                    const categoryToSelect = optionsData.find(cat => cat.id === categoryIdNum);
                    if (categoryToSelect) {
                        setSelected([categoryToSelect]);
                    }
                }

                setError(null);
            } catch (err) {
                setError('Не удалось загрузить новости');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, [categoryId]);

    const filteredNews = useMemo(() => {
        if (selected.length === 0) {
            return newsList;
        }

        return newsList.filter(news =>
            news.categories.some(categoryId =>
                selected.some(selectedCategory => selectedCategory.id === categoryId)
            )
        );
    }, [selected, newsList]);

    const handleOptionRemove = (option: WordPressCategory) => {
            setSelected(selected.filter(item => item.id !== option.id));
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div>{error}</div>;

    return (
        <>
            <SEO
                title="Новости | Бэкстейдж, афиша, концерт, билеты"
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <div className='xl:w-[1152px] w-[90vw] flex flex-col gap-11 mt-[76px]'>
                <div className='flex flex-col gap-2'>
                    <div className='flex'>
                        <Breadcrumbs isFirst={true} to='/'>Главная</Breadcrumbs>
                        <Breadcrumbs isLast={true}>Новости</Breadcrumbs>
                    </div>
                    <h1><Text variant={TextVariant.H1}>НОВОСТИ</Text></h1>
                </div>

                <div className='flex xl:flex-row flex-col gap-6'>
                    <MultiSelect className='xl:w-60 w-full' options={options} selectedValues={selected} onChange={setSelected} />
                    {selected.length > 0 ? <Chips options={selected} onItemClose={handleOptionRemove}/> : <></>}

                </div>

                <div className='flex flex-col gap-11 justify-center'>
                    {filteredNews.map((item) => (
                        <NewsCard key={item.id} post={item} />
                    ))}
                </div>
            </div>
        </>

    );
};

export default NewsListPage;