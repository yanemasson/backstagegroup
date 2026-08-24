import {useEffect, useMemo, useState} from "react";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import {DrupalAPI} from "../../api/drupal.ts";
import DownIcon from '../../assets/icons/arrows/ic_down.svg?react'
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import Text, {TextVariant} from "../../components/Text.tsx";
import EventCardDesktop from "../../components/EventCard/EventCardDesktop.tsx";
import EventCardMobile from "../../components/EventCard/EventCardMobile.tsx";
import createSlug from "../../utils/createSlug.ts";
import {useCity} from "../../hooks/geolocation/useCity.ts";
import {Event} from "../../types/events/event.ts";
import IconButton, {IconButtonSize, IconButtonVariant} from "../../components/Buttons/IconButton.tsx";
import CitySearchModal from "../../components/CitySearchModal.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import Tab, { TabButtonSize } from "../../components/Tab.tsx";
import {useHideOnScroll} from "../../hooks/useHideOnScroll.ts";
import {useBodyScrollLock} from "../../hooks/useBodyScrollLock.ts";

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const VISIBLE_MONTHS_COUNT = 6;

const monthKey = (year: number, monthIndex: number) => `${year}-${monthIndex}`;

const EventsPage = () => {

    const {selectedCity} = useCity();
    const [citySearchModalIsOpen, setCitySearchModalIsOpen] = useState(false)

    const headerIsVisible = useHideOnScroll(false);

    // Набор вкладок зависит только от текущей даты — считаем один раз за монтирование
    const visibleMonths = useMemo(() => {
        const now = new Date();
        const currentMonthIndex = now.getMonth();

        return Array.from({length: VISIBLE_MONTHS_COUNT}, (_, i) => {
            const monthIndex = (currentMonthIndex + i) % 12;
            const yearOffset = Math.floor((currentMonthIndex + i) / 12);
            const year = now.getFullYear() + yearOffset;

            return {
                index: monthIndex,
                name: MONTHS[monthIndex],
                year,
                displayName: `${MONTHS[monthIndex]}${yearOffset > 0 ? ` ${year}` : ''}`
            };
        });
    }, []);

    const [activeMonthSection, setActiveMonthSection] = useState(0)
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const xl = useMediaBreakpoint('xl')

    const eventsByMonth = useMemo(() => {
        const grouped = new Map<string, Event[]>();

        for (const event of events) {
            const date = new Date(event.date);
            const key = monthKey(date.getFullYear(), date.getMonth());
            const bucket = grouped.get(key);

            if (bucket) bucket.push(event);
            else grouped.set(key, [event]);
        }

        return grouped;
    }, [events]);

    const filteredEvents = useMemo(() => {
        if (activeMonthSection === 0) return events;

        const monthInfo = visibleMonths[activeMonthSection - 1];
        if (!monthInfo) return [];

        return eventsByMonth.get(monthKey(monthInfo.year, monthInfo.index)) ?? [];
    }, [activeMonthSection, events, eventsByMonth, visibleMonths]);


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                let eventsList
                if(selectedCity) {
                    eventsList = await DrupalAPI.getEventsByCity(selectedCity);
                } else {
                    eventsList = await DrupalAPI.getEventsByCity('Все города');
                }
                setEvents(eventsList)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [selectedCity]);

    useBodyScrollLock(citySearchModalIsOpen);
    
    if(loading) { return <LoadingSpinner/> }
    if(error) { return <>{error}</> }

    return (
        <div className="flex flex-col gap-11 pt-[76px] xl:w-[1152px] w-[90vw]">
            <div className='flex flex-col gap-2'>
                <div className='flex'>
                    <Breadcrumbs isFirst={true} to='/'>Главная</Breadcrumbs>
                    <Breadcrumbs isLast={true}>Афиша</Breadcrumbs>
                </div>
                <div className='flex gap-2 '>
                    {selectedCity === "Все города"
                        ? <Text variant={TextVariant.H2}>АФИША ВО ВСЕХ ГОРОДАХ</Text>
                        : <Text variant={TextVariant.H2}>АФИША {selectedCity?.toUpperCase()}</Text>
                    }
                    <IconButton onClick={() => setCitySearchModalIsOpen(true)} variant={IconButtonVariant.NoFilledSecondary} size={IconButtonSize.small}>
                        <DownIcon />
                    </IconButton>
                </div>
            </div>

            <div className=' flex flex-col'>
                <div
                    className={`sticky flex xl:w-full w-[90vw] overflow-x-auto scrollbar-hide bg-bg-global z-10
                    ${headerIsVisible ? 'top-[76px]' : 'top-0'} transition-all duration-300`}
                >
                    <Tab
                        size={xl ? TabButtonSize.medium : TabButtonSize.small}
                        className='flex-1 min-w-[108px] text-nowrap'
                        isActive={activeMonthSection === 0}
                        onClick={() => setActiveMonthSection(0)}
                    >
                        Все месяца
                    </Tab>
                    {visibleMonths.map((monthData, idx) => {
                        const hasEvents = eventsByMonth.has(monthKey(monthData.year, monthData.index));

                        return (
                            <Tab
                                size={xl ? TabButtonSize.medium : TabButtonSize.small}
                                className='flex-1 min-w-[108px]'
                                key={`${monthData.index}-${monthData.year}`}
                                onClick={() => setActiveMonthSection(idx + 1)}
                                isActive={activeMonthSection === idx + 1}
                                disabled={!hasEvents}
                            >
                                {monthData.name}
                            </Tab>
                        );
                    })}
            </div>
                {filteredEvents.map((item, index) => (
                    xl
                        ? <EventCardDesktop
                            key={item.eventId}
                            item={item}
                            to={createSlug(item.eventId)}
                            hasDivider={index !== filteredEvents.length - 1}
                        />
                        : <EventCardMobile
                            key={item.eventId}
                            item={item}
                            to={createSlug(item.eventId)}
                            hasDivider={index !== filteredEvents.length - 1}
                        />
                ))}
            </div>

            <CitySearchModal isOpen={citySearchModalIsOpen} onClose={() => setCitySearchModalIsOpen(false)} />
        </div>
    );
};

export default EventsPage;