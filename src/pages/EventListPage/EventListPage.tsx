import EventCardDesktop from "../../components/EventCard/EventCardDesktop.tsx";
import useEvents from "../../hooks/cms/useEvents.ts";
import {SEO} from "../../components/SEO.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import createSlug from "../../utils/createSlug.ts";
import EventCardMobile from "../../components/EventCard/EventCardMobile.tsx";

const EventListPage = () => {
    const {events} = useEvents()
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
                {events.map((item, index) => (
                    lg
                        ? <EventCardDesktop key={index} item={item} index={index}
                                            to={createSlug(item.title, item.city, item.concerts[0].date)}/>
                        : <EventCardMobile key={index} item={item} index={index}
                                             to={createSlug(item.title, item.city, item.concerts[0].date)}/>

                ))}
            </section>
        </>

    );
};

export default EventListPage;
