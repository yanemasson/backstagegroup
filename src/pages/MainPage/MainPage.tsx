import {SEO} from "../../components/SEO.tsx";
import EventList from "./sections/EventList/EventList.tsx";
import {lazy, Suspense} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import SEOContent from "../../components/SEOContent.tsx";

const Hero = lazy(() => import('./sections/Hero/Hero'));
const AboutUsSection = lazy(() => import('./sections/AboutUs/AboutUs'));
const ReviewsSection = lazy(() => import('../EventPage/sections/ReviewsSection'));
const NewsSection = lazy(() => import('./sections/News/NewsSection'));
const Faq = lazy(() => import('./sections/FAQ/FAQ'));

const MainPage = () => {
    return (
        <div className='flex flex-col items-center '>
            <SEO
                title="Главная страница | Бэкстейдж, афиша, концерт, билеты"
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <div className='flex flex-col items-center gap-[100px] xl:gap-30'>
                <Suspense fallback={<LoadingSpinner />}><Hero/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><EventList/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><AboutUsSection/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><ReviewsSection/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><NewsSection/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><Faq/></Suspense>
                
                {/* SEO-текст для главной страницы Красноярска */}
                <SEOContent city="krasnoyarsk" pageType="main" />
            </div>
        </div>
    );
};

export default MainPage;