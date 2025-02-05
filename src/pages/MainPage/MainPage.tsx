import Hero from "./sections/Hero/Hero.tsx";
import {SEO} from "../../components/SEO.tsx";
import EventList from "./sections/EventList/EventList.tsx";


const MainPage = () => {
    return (
        <>
            <SEO
                title="Главная страница | Бэкстейдж, афиша, концерт, билеты"
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <Hero/>
            <EventList/>
        </>
    );
};

export default MainPage;