import EventCardDesktop from "../../../../components/EventCard/EventCardDesktop.tsx";
import Text, {TextVariant} from "../../../../components/Text.tsx";
import {Link} from "react-router";
import Button, {ButtonVariant} from "../../../../components/Buttons/Button.tsx";
import {useEvents} from "../../../../hooks/cms/useEvents.ts";
import {useMediaBreakpoint} from "../../../../hooks/useMediaBreakpoint.ts";
import ConcertCardMobile from "../../../../components/EventCard/EventCardMobile.tsx";
import createSlug from "../../../../utils/createSlug.ts";

const EventList = () => {
/*
    const { selectedCity } = useCity();
*/
    const {events} = useEvents()
    console.log(events)
    const lg =  useMediaBreakpoint('lg')
    const selectedCity = 'Красноярск'
    const filteredEvents = events.filter(item => item.city === selectedCity);

    return (
        <section id='list' className='flex flex-col gap-10 lg:gap-40 px-5 py-20 lg:px-40 bg-black text-white'>
            {filteredEvents.length > 0 ? (
                filteredEvents.map((item, index) => (
                    lg
                        ? <EventCardDesktop key={index} item={item} index={index}
                                            to={createSlug(item.title, item.city, item.concerts[0].date)}/>
                        : <ConcertCardMobile key={index} item={item} index={index}
                                             to={createSlug(item.title, item.city, item.concerts[0].date)}/>
                    )
                )
            ) : (
                <div className="flex flex-col items-center justify-center gap-5 py-20">
                    <Text variant={TextVariant.B}>В городе {selectedCity} пока нет концертов</Text>
                    <Text variant={TextVariant.P}>Выберите другой город или следите за обновлениями</Text>
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