import Hero from "./sections/Hero/Hero.tsx";
import {SEO} from "../../components/SEO.tsx";
import EventList from "./sections/EventList/EventList.tsx";
import {lazy, Suspense} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import Faq from "./sections/FAQ/FAQ.tsx";
import NewsSection from "./sections/News/NewsSection.tsx";

const AboutUsSection = lazy(() => import('../EventPage/sections/AboutUsSection'));
const ReviewsSection = lazy(() => import('../EventPage/sections/ReviewsSection'));


const MainPage = () => {
    return (
        <div className='flex flex-col items-center overflow-hidden'>
            <SEO
                title="Главная страница | Бэкстейдж, афиша, концерт, билеты"
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <Hero/>
            <div className='flex flex-col items-center gap-[100px] xl:gap-40'>
                <Suspense fallback={<LoadingSpinner />}><EventList/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><AboutUsSection/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><NewsSection/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><Faq/></Suspense>

                <Suspense fallback={<LoadingSpinner />}><ReviewsSection/></Suspense>

            </div>
        </div>
    );
};

export default MainPage;