import EventCardDesktop from "../../../../components/EventCard/EventCardDesktop.tsx";
import Text, {TextVariant} from "../../../../components/Text.tsx";
import {Link} from "react-router";
import Button, {ButtonVariant} from "../../../../components/Buttons/Button.tsx";
import {useEvents} from "../../../../hooks/cms/useEvents.ts";
import {useMediaBreakpoint} from "../../../../hooks/useMediaBreakpoint.ts";
import EventCardMobile from "../../../../components/EventCard/EventCardMobile.tsx";
import createSlug from "../../../../utils/createSlug.ts";

const EventList = () => {
    const {events} = useEvents()
    const xl = useMediaBreakpoint('xl')
    return (
        <section id='eventlist' className='flex flex-col gap-10 lg:gap-40 py-20 bg-darkgray text-white xl:w-[1166px]'>
            {events.length > 0 ? (
                events.map((item, index) => (
                    xl
                        ? <EventCardDesktop key={index} item={item} to={createSlug(item.eventId)}/>
                        : <EventCardMobile key={index} item={item} to={createSlug(item.eventId)}/>
                    )
                )
            ) : (
                <div className="flex flex-col items-center justify-center gap-5 py-20">
                    <Link to={'events'}>
                        <Button variant={ButtonVariant.outline}>
                            <Text variant={TextVariant.P}>Все концерты</Text>
                        </Button>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default EventList;