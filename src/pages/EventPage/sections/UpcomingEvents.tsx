import Text, {TextVariant} from "../../../components/Text.tsx";
import EventCardDesktop from "../../../components/EventCard/EventCardDesktop.tsx";
import createSlug from "../../../utils/createSlug.ts";
import EventCardMobile from "../../../components/EventCard/EventCardMobile.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import {Event} from "../../../types/event.ts";

interface UpcomingEventsProps {
    events: Event[];
    item: Event;

}

const UpcomingEvents = ({events, item}: UpcomingEventsProps) => {
    const xl = useMediaBreakpoint('xl')
    return (
        <section id='eventlist'>
            <Text className='pb-[30px] xl:pb-[50px]' variant={TextVariant.H2}>БЛИЖАЙШИЕ КОНЦЕРТЫ</Text>
            <div id='eventlist' className='flex flex-col gap-0 xl:gap-10 bg-darkgray text-white '>
                {events.filter((event) => event.eventId != item.eventId && event.city === item.city)
                    .map((item, index) => (
                    xl
                        ? <EventCardDesktop key={index} item={item} to={createSlug(item.eventId)}/>
                        : <EventCardMobile key={index} item={item} to={createSlug(item.eventId)}/>
                ))}
            </div>
        </section>
    );
};

export default UpcomingEvents;