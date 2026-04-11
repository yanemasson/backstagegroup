import Text, {TextVariant} from "../../../../components/Text.tsx";
import createSlug from "../../../../utils/createSlug.ts";
import {useEffect, useState} from "react";
import {DrupalAPI} from "../../../../api/drupal.ts";
import {Event} from '../../../../types/events/event.ts'
import LoadingSpinner from "../../../../components/LoadingSpinner.tsx";
import EventCardMobile from "../../../../components/EventCard/EventCardMobile.tsx";
import {useMediaBreakpoint} from "../../../../hooks/useMediaBreakpoint.ts";
import EventCardDesktop from "../../../../components/EventCard/EventCardDesktop.tsx";
import {useCity} from "../../../../hooks/geolocation/useCity.ts";
import Button, {ButtonSize, ButtonVariant} from "../../../../components/Buttons/Button.tsx";
import {Link} from "react-router";
import IconButton, {IconButtonSize, IconButtonVariant} from "../../../../components/Buttons/IconButton.tsx";
import DownIcon from '../../../../assets/icons/arrows/ic_down.svg?react'
import CitySearchModal from "../../../../components/CitySearchModal.tsx";

const EventList = () => {

    const {selectedCity} = useCity();
    const [citySearchModalIsOpen, setCitySearchModalIsOpen] = useState(false)

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const xl = useMediaBreakpoint('xl')

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const city = selectedCity || 'Все города';
                const eventsList = await DrupalAPI.getEventsByCity(city);

                const getTodayString = () => new Date().toISOString().split('T')[0];
                const getEventDateString = (date: string) => date.split('T')[0];

                const todayStr = getTodayString();
                const upcomingEvents = eventsList.filter(item =>
                    getEventDateString(item.date) >= todayStr
                );

                setEvents(upcomingEvents.slice(0, 3));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [selectedCity]);

    useEffect(() => {
        if (citySearchModalIsOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = 'auto';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
        };
    }, [citySearchModalIsOpen]);

    if(loading) { return <LoadingSpinner/> }
    if(error) { return <>{error}</> }

    return (
        <section id='eventlist' className='flex flex-col w-[90vw] xl:w-full'>
            <div className='flex gap-2'>
                <Text variant={TextVariant.H2}>АФИША {selectedCity?.toUpperCase()}</Text>
                <IconButton onClick={() => setCitySearchModalIsOpen(true)} variant={IconButtonVariant.NoFilledSecondary} size={IconButtonSize.small}>
                    <DownIcon />
                </IconButton>
            </div>
            <div className='flex flex-col'>
                {events.length > 0
                    ? (events.map((item, index) => (
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
                    ))
                    : <Text className='text-text-tertiary' variant={TextVariant.Body_M}>
                        В ближайшее время концерты в вашем городе не запланированы. Следите за обновлениями!
                    </Text>
                }

                <Link className='self-center' to='/events'>
                    <Button className='w-[138px]' variant={ButtonVariant.shadow} size={ButtonSize.small}>
                        Вся афиша
                    </Button>
                </Link>
            </div>

            <CitySearchModal isOpen={citySearchModalIsOpen} onClose={() => setCitySearchModalIsOpen(false)} />
        </section>
    );
};

export default EventList;