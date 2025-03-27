import EventCardDesktop from "../../components/EventCard/EventCardDesktop.tsx";
import useEvents from "../../hooks/cms/useEvents.ts";
import {SEO} from "../../components/SEO.tsx";
import createSlug from "../../utils/createSlug.ts";
import EventCardMobile from "../../components/EventCard/EventCardMobile.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";

const EventListPage = () => {
    const {events} = useEvents()
    const xl = useMediaBreakpoint('xl')


    return (
        <>
            <SEO
                title="Все концерты | Бэкстейдж, афиша, концерт, билеты"
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <section id='list' className='flex flex-col gap-0 lg:gap-40 py-20 bg-darkgray text-white '>
                {events.map((item, index) => (
                    xl
                        ? <EventCardDesktop key={index} item={item} to={createSlug(item.eventId)}/>
                        : <EventCardMobile key={index} item={item} to={createSlug(item.eventId)}/>
                ))}
            </section>
        </>

    );
};

export default EventListPage;
