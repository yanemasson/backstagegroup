import Hero from "./sections/Hero/Hero.tsx";
import {SEO} from "../../components/SEO.tsx";
import EventList from "./sections/EventList/EventList.tsx";
import AboutUsSection from "../EventPage/sections/AboutUsSection.tsx";
import ReviewsSection from "../EventPage/sections/ReviewsSection.tsx";
import ReportsSection from "../EventPage/sections/ReportsSection.tsx";


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
            <div className='flex flex-col items-center gap-40'>
                <AboutUsSection/>
                <section className='flex flex-col gap-40' id='reviews'>
                    <ReportsSection/>
                    <ReviewsSection/>
                </section>
                <EventList/>
            </div>
        </div>
    );
};

export default MainPage;