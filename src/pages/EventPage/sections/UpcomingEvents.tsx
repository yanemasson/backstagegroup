import Text, {TextVariant} from "../../../components/Text.tsx";
import EventCardDesktop from "../../../components/EventCard/EventCardDesktop.tsx";
import createSlug from "../../../utils/createSlug.ts";
import EventCardMobile from "../../../components/EventCard/EventCardMobile.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import {Event} from "../../../types/event.ts";
import {Link} from "react-router";
import Button, {ButtonSize, ButtonVariant} from "../../../components/Buttons/Button.tsx";

interface UpcomingEventsProps {
    events: Event[];
}

const UpcomingEvents = ({events}: UpcomingEventsProps) => {
    const xl = useMediaBreakpoint('xl')

    if (events.length === 0) {
        return null
    }

    return (
        <section id='eventlist'>
            <Text variant={TextVariant.H2}>БЛИЖАЙШИЕ КОНЦЕРТЫ</Text>
            <div id='eventlist' className='flex flex-col '>
                {events.map((item, index) => (
                    xl
                        ? <EventCardDesktop
                            key={index}
                            item={item}
                            to={createSlug(item.eventId)}
                            isLast={index !== events.length - 1}
                        />
                        : <EventCardMobile
                            key={index}
                            item={item}
                            to={createSlug(item.eventId)}
                            isLast={index !== events.length - 1}
                        />
                ))}
                <Link className='self-center' to='/events'>
                    <Button className='w-[138px]' variant={ButtonVariant.shadow} size={ButtonSize.small}>Вся афиша</Button>
                </Link>
            </div>

        </section>
    );
};

export default UpcomingEvents;