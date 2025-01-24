import Hero from "./sections/Hero/Hero.tsx";
import ConcertList from "./sections/ConcertList/ConcertList.tsx";
import {SEO} from "../../components/SEO.tsx";


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
            <ConcertList/>
        </>
    );
};

export default MainPage;