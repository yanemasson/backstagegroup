import Text, {TextVariant} from "../../components/Text.tsx";
import NewsCard from "../../components/NewsCard.tsx";
import MultiSelect from "../../components/MultiSelect.tsx";
import {useEffect, useMemo, useState} from "react";
import {fetchCategories, fetchNews, WordPressCategory, WordPressPost} from "../../api";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import {SEO} from "../../components/SEO.tsx";
import { useSearchParams } from 'react-router-dom';

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
                const newsData = await fetchNews();
                const optionsData = await fetchCategories();
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
            <div className='xl:w-[1200px] flex flex-col self-start items-start gap-[60px]'>
                <div className='flex flex-col md:flex-row md:w-full gap-[30px] justify-between items-start'>
                    <Text className='text-light-brown' variant={TextVariant.H1}>НОВОСТИ</Text>
                    <MultiSelect options={options} selectedValues={selected} onChange={setSelected} />
                </div>

                <div className='flex flex-col gap-10 lg:gap-[50px] justify-center'>
                    {filteredNews.map((item) => (
                        <NewsCard key={item.id} post={item} />
                    ))}
                </div>

                {/*            <button className='w-32 self-center'
                aria-label='Показать еще' >
                <Text className='flex gap-1.5 items-center text-lightgray hover:text-white focus:text-white' variant={TextVariant.CAPTION}>
                    Показать еще
                    <svg width="12" height="9"
                         viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L0 0H12L6 9Z" fill="currentColor" />
                    </svg>
                </Text>
            </button>*/}
            </div>
        </>

    );
};

export default NewsListPage;