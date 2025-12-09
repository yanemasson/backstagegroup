import Text, {TextVariant} from "../../../../components/Text.tsx";
import createSlug from "../../../../utils/createSlug.ts";
import {useEffect, useState} from "react";
import {DrupalAPI} from "../../../../api/drupal.ts";
import {Event} from '../../../../types/event.ts'
import LoadingSpinner from "../../../../components/LoadingSpinner.tsx";
import EventCardMobile from "../../../../components/EventCard/EventCardMobile.tsx";
import {useMediaBreakpoint} from "../../../../hooks/useMediaBreakpoint.ts";
import EventCardDesktop from "../../../../components/EventCard/EventCardDesktop.tsx";
import {useCity} from "../../../../hooks/geolocation/useCity.ts";
import Button, {ButtonSize, ButtonVariant} from "../../../../components/Buttons/Button.tsx";
import {Link} from "react-router";

const EventList = () => {

    const {selectedCity} = useCity();

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const xl = useMediaBreakpoint('xl')

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const eventsList = await DrupalAPI.getEvents();
                setEvents(eventsList.filter((item) => item.city == selectedCity));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [selectedCity]);


    if(loading) { return <LoadingSpinner/> }
    if(error) { return <>{error}</> }

    return (
        <section id='eventlist' className='flex flex-col w-[90vw] lg:w-full'>
            <Text variant={TextVariant.H2}>АФИША {selectedCity?.toUpperCase()}</Text>
            <div className='flex flex-col'>
                {events.length > 0 ? (
                    events
                        .slice(0, 3)
                        .map((item, index) => (
                        xl
                            ? <EventCardDesktop
                                key={index} item={item}
                                to={createSlug(item.eventId)}
                                isLast={index !== events.length - 1}
                            />
                            : <EventCardMobile
                                key={index}
                                item={item}
                                to={createSlug(item.eventId)}
                                isLast={index !== events.length - 1}
                            />
                        )
                    )
                ) : <>text</> }
                <Link className='self-center' to='/events'>
                    <Button className='w-[138px]' variant={ButtonVariant.shadow} size={ButtonSize.small}>Вся афиша</Button>
                </Link>
            </div>
        </section>
    );
};

export default EventList;