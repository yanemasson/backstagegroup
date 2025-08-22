import Text, {TextVariant} from "../../../../components/Text.tsx";
import createSlug from "../../../../utils/createSlug.ts";
import {useEffect, useState} from "react";
import {DrupalAPI} from "../../../../api/drupal.ts";
import { Event } from '../../../../types/event.ts'
import LoadingSpinner from "../../../../components/LoadingSpinner.tsx";
import EventCardMobile from "../../../../components/EventCard/EventCardMobile.tsx";
import {useMediaBreakpoint} from "../../../../hooks/useMediaBreakpoint.ts";
import EventCardDesktop from "../../../../components/EventCard/EventCardDesktop.tsx";

const EventList = () => {

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const xl = useMediaBreakpoint('xl')

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const eventsList = await DrupalAPI.getEvents();
                setEvents(eventsList);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);


    if(loading) { return <LoadingSpinner/> }
    if(error) { return <>{error}</> }

    return (
        <section id='eventlist' className='flex flex-col gap-10 xl:gap-20 bg-darkgray text-white xl:w-[1166px]'>
            <div>
                <Text variant={TextVariant.H4}>Все даты</Text>
            </div>

            {events.length > 0 ? (
                events.map((item, index) => (
                    xl
                        ? <EventCardDesktop key={index} item={item} to={createSlug(item.eventId)}/>
                        : <EventCardMobile key={index} item={item} to={createSlug(item.eventId)}/>
                    )
                )
            ) : (
                <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                    В ближайшее время концертов не планируется. Следите за обновлениями!
                </Text>
            )}
        </section>
    );
};

export default EventList;