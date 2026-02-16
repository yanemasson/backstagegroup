import {useEffect, useState} from "react";
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

const EventsPage = () => {

    const {selectedCity} = useCity();
    const [citySearchModalIsOpen, setCitySearchModalIsOpen] = useState(false)

    const [headerIsVisible, setHeaderIsVisible] = useState(false)
    
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентярь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const now = new Date()
    const currentMonthIndex = now.getMonth()

    const getVisibleMonths = () => {
        const visibleMonths = [];
        for (let i = 0; i < 6; i++) {
            const monthIndex = (currentMonthIndex + i) % 12;
            const yearOffset = Math.floor((currentMonthIndex + i) / 12);
            const year = now.getFullYear() + yearOffset;
            visibleMonths.push({
                index: monthIndex,
                name: months[monthIndex],
                year,
                displayName: `${months[monthIndex]}${yearOffset > 0 ? ` ${year}` : ''}`
            });
        }
        return visibleMonths;
    };

    const visibleMonths = getVisibleMonths();

    const [activeMonthSection, setActiveMonthSection] = useState(0)
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const xl = useMediaBreakpoint('xl')

    const hasEventsInMonth = (monthIndex: number, year: number): boolean => {
        return events.some(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === monthIndex && eventDate.getFullYear() === year;
        });
    };


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

    useEffect(() => {
        if (activeMonthSection === 0) {
            setFilteredEvents(events);
        } else {
            const monthInfo = visibleMonths[activeMonthSection - 1];
            if (!monthInfo) {
                setFilteredEvents([]);
                return;
            }

            const filtered = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getMonth() === monthInfo.index &&
                    eventDate.getFullYear() === monthInfo.year;
            });
            setFilteredEvents(filtered);
        }
    }, [activeMonthSection, events]);

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

    //положение табов
    useEffect(() => {
        let ticking = false;
        let lastScrollY = 0;
        let hideTimeout: NodeJS.Timeout | null = null;

        const controlNavbar = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const scrollDelta = currentScrollY - lastScrollY;
                    const isScrollingDown = scrollDelta > 0;
                    const isScrollingUp = scrollDelta < 0;

                    if (hideTimeout) {
                        clearTimeout(hideTimeout);
                    }

                    if (isScrollingDown && headerIsVisible && currentScrollY > 50) {
                        console.log('Setting hide timeout');
                        hideTimeout = setTimeout(() => {
                            console.log('Hiding navbar');
                            setHeaderIsVisible(false);
                        }, 50);
                    }
                    else if (isScrollingUp && !headerIsVisible) {
                        console.log('Setting show timeout');
                        hideTimeout = setTimeout(() => {
                            console.log('Showing navbar');
                            setHeaderIsVisible(true);
                        }, 50);
                    }

                    if (currentScrollY < 50) {
                        console.log('At top - showing navbar');
                        if (hideTimeout) {
                            clearTimeout(hideTimeout);
                        }
                        setHeaderIsVisible(true);
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
        };
    }, [headerIsVisible]);
    
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
                        const hasEvents = hasEventsInMonth(monthData.index, monthData.year);

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
                            key={index}
                            item={item}
                            to={createSlug(item.eventId)}
                            isLast={index !== filteredEvents.length - 1}
                        />
                        : <EventCardMobile
                            key={index}
                            item={item}
                            to={createSlug(item.eventId)}
                            isLast={index !== filteredEvents.length - 1}
                        />
                ))}
            </div>

            <CitySearchModal isOpen={citySearchModalIsOpen} onClose={() => setCitySearchModalIsOpen(false)} />
        </div>
    );
};

export default EventsPage;