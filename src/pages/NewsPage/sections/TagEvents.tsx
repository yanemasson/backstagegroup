import Text, {TextVariant} from "../../../components/Text.tsx";
import EventCardDesktop from "../../../components/EventCard/EventCardDesktop.tsx";
import createSlug from "../../../utils/createSlug.ts";
import EventCardMobile from "../../../components/EventCard/EventCardMobile.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import useEvents from "../../../hooks/cms/useEvents.ts";
import LoadingSpinner from "../../../components/LoadingSpinner.tsx";
import {useEffect, useState} from "react";
import { Event } from '../../../types/event.ts'

const TagEvents = ({tag}: { tag: string; }) => {

    const {events, isLoading} = useEvents()
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const xl = useMediaBreakpoint('xl')

    useEffect(() => {
        setFilteredEvents(events.filter(event => event.tag === tag))
    }, [events, tag]);

    if (isLoading) {return <LoadingSpinner/>}

    return (
        <section id='eventlist'>
            <Text className='pb-[30px] xl:pb-[50px]' variant={TextVariant.H2}>БЛИЖАЙШИЕ КОНЦЕРТЫ</Text>
            <div id='eventlist' className='flex flex-col gap-0 xl:gap-10 bg-darkgray text-white '>
                {filteredEvents.length === 0 ?
                    events.slice(0, 3).map((item) => (
                        xl
                            ? <EventCardDesktop key={item.eventId} item={item} to={createSlug(item.eventId)}/>
                            : <EventCardMobile key={item.eventId} item={item} to={createSlug(item.eventId)}/>
                    ))
                    : filteredEvents.slice(0, 3).map((item) => (
                    xl
                        ? <EventCardDesktop key={item.eventId} item={item} to={createSlug(item.eventId)}/>
                        : <EventCardMobile key={item.eventId} item={item} to={createSlug(item.eventId)}/>
                ))}
            </div>
        </section>
    );
};

export default TagEvents;