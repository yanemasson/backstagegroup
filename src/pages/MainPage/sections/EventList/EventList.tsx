import Text, {TextVariant} from "../../../../components/Text.tsx";
import createSlug from "../../../../utils/createSlug.ts";
import {useEffect, useState} from "react";
import {DrupalAPI} from "../../../../api/drupal.ts";
import {Event} from '../../../../types/event.ts'
import LoadingSpinner from "../../../../components/LoadingSpinner.tsx";
import EventCardMobile from "../../../../components/EventCard/EventCardMobile.tsx";
import {useMediaBreakpoint} from "../../../../hooks/useMediaBreakpoint.ts";
import EventCardDesktop from "../../../../components/EventCard/EventCardDesktop.tsx";
import {getDate} from "../../../../utils/getDate.ts";
import MonthButton from "../../components/MonthButton.tsx";
import {useCity} from "../../../../hooks/geolocation/useCity.ts";

const EventList = () => {

    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль', 'Март', 'Апрель']
    const monthSlugs = ['yanvar', 'fevral', 'mart', 'aprel', 'maj', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr', 'yanvar', 'fevral', 'mart', 'aprel'];
    
    const [firstMonth, setFirstMonth] = useState(0)
    const [activeMonthSection, setActiveMonthSection] = useState(0)
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const {selectedCity} = useCity();
    const isSEOCity = selectedCity === 'Красноярск' || selectedCity === 'Новосибирск';

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
                setFirstMonth(getDate(eventsList[0].date).monthNum - 1);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [selectedCity]);

    useEffect(() => {
        if (activeMonthSection === 0) {
            setFilteredEvents(events);
        } else {
            const targetMonthIndex = firstMonth + activeMonthSection - 1;
            const filtered = events.filter(event => {
                const eventMonth = getDate(event.date).monthNum - 1;
                return eventMonth === targetMonthIndex;
            });
            setFilteredEvents(filtered);
        }
    }, [activeMonthSection, events, firstMonth]);


    if(loading) { return <LoadingSpinner/> }
    if(error) { return <>{error}</> }

    return (
        <section id='eventlist' className='flex flex-col gap-10 bg-darkgray text-white w-[90vw] xl:w-[1166px]'>
            <Text variant={TextVariant.H2}>АФИША {selectedCity?.toUpperCase()}</Text>
            <div className='grid grid-cols-3 justify-items-center gap-2 md:grid-cols-4 xl:flex xl:gap-[30px]'>
                <MonthButton
                    isActive={activeMonthSection === 0}
                    count={events.length}
                    setActive={!isSEOCity ? () => setActiveMonthSection(0) : undefined}
                    href={isSEOCity ? '/' : undefined}
                >
                    Все даты
                </MonthButton>
                {months.map((month, index) => (
                    (index >= firstMonth && index <= firstMonth + 4) &&
                    <MonthButton
                        key={month + index}
                        setActive={!isSEOCity ? () => setActiveMonthSection(index - firstMonth + 1) : undefined}
                        isActive={activeMonthSection === index - firstMonth + 1}
                        href={isSEOCity ? `/${monthSlugs[index]}` : undefined}
                        count={events.filter(event => {
                            const eventMonth = getDate(event.date).monthNum - 1;
                            return eventMonth === index;
                        }).length}
                    >
                        {month}
                    </MonthButton>
                ))}
            </div>
            <div className='flex flex-col gap-[50px]'>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((item, index) => (
                        <>
                            {xl
                                ? <EventCardDesktop key={index} item={item} to={createSlug(item.eventId)}/>
                                : <EventCardMobile key={index} item={item} to={createSlug(item.eventId)}/>
                            }
                            {index !== filteredEvents.length - 1 && <div className='w-full border-solid border-semi-darkgray border-t-[2px] border-x-0 border-b-0'/>}

                        </>

                        )
                    )
                ) : (
                    <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                        {activeMonthSection === 0
                            ? 'В ближайшее время концертов не планируется. Следите за обновлениями!'
                            : `В этом месяце концертов не планируется. Следите за обновлениями!`
                        }
                    </Text>
                )}
            </div>
        </section>
    );
};

export default EventList;