import {Event} from "../../../types/events/event.ts";
import Text, {TextVariant} from "../../../components/Text.tsx";
import EventCardDesktop from "../../../components/EventCard/EventCardDesktop.tsx";
import createSlug from "../../../utils/createSlug.ts";
import EventCardMobile from "../../../components/EventCard/EventCardMobile.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";

interface ProgramEventsProps {
    events: Event[];
}

const ProgramEvents = ({events}: ProgramEventsProps) => {

    const xl = useMediaBreakpoint('xl')

    return (
        <div>
            <Text className='pb-[30px] xl:pb-[50px]' variant={TextVariant.H2}>БЛИЖАЙШИЕ КОНЦЕРТЫ</Text>
            <div className='flex flex-col gap-0 xl:gap-10 bg-darkgray text-white '>
                {events.length > 0
                    ? events.map((item, index) => (
                        xl
                            ? <EventCardDesktop
                                key={item.eventId}
                                item={item}
                                to={createSlug(item.eventId)}
                                hasDivider={index !== events.length - 1}
                            />
                            : <EventCardMobile
                                key={item.eventId}
                                item={item}
                                to={createSlug(item.eventId)}
                                hasDivider={index !== events.length - 1}
                            />
                    ))
                    : <Text className='text-text-tertiary' variant={TextVariant.Body_M}>В ближайшее время в вашем городе концертов не ожидается. Следите за обновлениями!</Text>
                }
            </div>
        </div>
    );
};

export default ProgramEvents;