import ConcertCardDesktop from "../../components/ConcertCard/ConcertCardDesktop.tsx";
import useConcerts from "../../hooks/cms/useConcerts.ts";
import {SEO} from "../../components/SEO.tsx";
import ConcertCardMobile from "../../components/ConcertCard/ConcertCardMobile.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import createSlug from "../../utils/createSlug.ts";

const ConcertListPage = () => {
    const {concerts} = useConcerts()
    const lg = useMediaBreakpoint('lg')

    return (
        <>
            <SEO
                title="Все концерты | Бэкстейдж, афиша, концерт, билеты"
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <section id='list' className='flex flex-col gap-10 lg:gap-40 px-5 py-20 lg:px-40 bg-black text-white'>
                {concerts.map((item, index) => (
                    lg
                        ? <ConcertCardDesktop key={index} item={item} index={index}
                                              to={createSlug(item.title, item.city, item.date)}/>
                        : <ConcertCardMobile key={index} item={item} index={index}
                                             to={createSlug(item.title, item.city, item.date)}/>

                ))}
            </section>
        </>

    );
};

export default ConcertListPage;
