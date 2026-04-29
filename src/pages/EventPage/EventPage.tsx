import {useParams} from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import {SEO} from "../../components/SEO.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import {lazy, Suspense, useEffect, useState} from "react";
import Text, {TextVariant} from "../../components/Text.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import HeroDesktop from "./sections/HeroDesktop.tsx";
import HeroMobile from "./sections/HeroMobile.tsx";
import {DrupalAPI} from "../../api/drupal.ts";
import {Event} from '../../types/events/event.ts'
import {Program} from '../../types/events/program.ts'
import Disclaimer from "./sections/Disclaimer.tsx";
import Tab, {TabButtonSize} from "../../components/Tab.tsx";
import FixedTicketButton from "./components/FixedTicketButton.tsx";

const Information = lazy(() => import('./sections/Information'));
const TrackList = lazy(() => import('./sections/TrackList'));
const ArtistsSection = lazy(() => import('./sections/ArtistsSection'));
const LocationSection = lazy(() => import('./sections/LocationSection'));
const GallerySection = lazy(() => import('./sections/Gallery'))
const UpcomingEvents = lazy(() => import('./sections/UpcomingEvents'));
const NewsSection = lazy(() => import('../MainPage/sections/News/NewsSection'))

const EventPage = () => {
    const {id} = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);

    const [event, setEvent] = useState<Event | null>(null);
    const [events, setEvents] = useState<Event[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [headerIsVisible, setHeaderIsVisible] = useState(false)
    const xl = useMediaBreakpoint('xl')

    //получаем концерт
    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) {
                setError('Event ID не указан');
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const eventData = await DrupalAPI.getEventByEventId(id);
                if (!eventData) {
                    return;
                }

                const programData: Program | null = await DrupalAPI.getProgramByUrl(eventData.program);
                if (!programData) {
                    return;
                }

                setEvent({
                    ...eventData,
                    poster: eventData.poster || programData.poster,
                    duration: eventData.duration || programData.duration,
                    descriptionShort: eventData.descriptionShort || programData.descriptionShort,
                    descriptionFull: eventData.descriptionFull || programData.descriptionFull,
                    video: eventData.video || programData.video,
                    age: eventData.age || programData.age,
                    trackList: eventData.trackList?.length ? eventData.trackList : programData.trackList,
                    information: eventData.information?.length ? eventData.information : programData.information,
                    photos: programData.photos,
                    videos: programData.videos,
                    orgId: eventData.orgId,
                });

                setLoading(false)

            } catch (err) {
                console.error('Error loading event:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
                setEvent(null);
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    //получаем остальные концерты
    useEffect(() => {
        const fetchEvents = async () => {
            try {

                const eventsList = await DrupalAPI.getEvents();

                const getTodayString = () => new Date().toISOString().split('T')[0];
                const getEventDateString = (date: string) => date.split('T')[0];

                const todayStr = getTodayString();
                const upcomingEvents = eventsList.filter(item =>
                    getEventDateString(item.date) >= todayStr
                );

                setEvents(upcomingEvents);

                if (!eventsList) {
                    setError(`События не найдены`);
                }
            } catch (err) {
                console.error('Error loading events:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            }
        };

        fetchEvents();
    }, [id]);

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
                        hideTimeout = setTimeout(() => {
                            setHeaderIsVisible(false);
                        }, 50);
                    } else if (isScrollingUp && !headerIsVisible) {
                        hideTimeout = setTimeout(() => {
                            setHeaderIsVisible(true);
                        }, 50);
                    }

                    if (currentScrollY < 50) {
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

    type menuItemType = 'Описание программы' | 'Трек-лист' | 'Исполнители' | 'Площадка' | null
    const [activeSection, setActiveSection] = useState<menuItemType>('Описание программы')
    const menuItems: menuItemType[] = ['Описание программы', 'Трек-лист', 'Исполнители', 'Площадка']

    const toggleMenu = (item: menuItemType) => {
        if (item === activeSection) {
            return setActiveSection(null)
        }
        setActiveSection(item)
    }

    const md = useMediaBreakpoint('md')

    if (loading) return <LoadingSpinner/>
    if (!event) return <NotFoundPage/>
    if (error) return <>{error}</>

    const renderContent = () => {
        switch (activeSection) {
            case 'Описание программы':
                return <Information descriptionFull={event.descriptionFull} information={event.information}/>
            case 'Трек-лист':
                return <TrackList trackList={event.trackList ? event.trackList : []}/>
            case 'Исполнители':
                return <ArtistsSection
                    artists={event.artists ? event.artists : []}
                    artistsTeam={event.artistsTeam ? event.artistsTeam : ''}
                    artistsGroupPhoto={event.artistsGroupPhoto && event.artistsGroupPhoto}
                    artistsSubTitle={event.artistsSubTitle}
                />
            case 'Площадка':
                return <LocationSection
                    photos={event.locationPhotos}
                    location={event.location}
                    address={event.address}
                />
            default:
                return null
        }
    };

    return (
        <>
            <SEO
                title={`${event.title + ', ' + event.city} | Бэкстейдж, афиша, концерт, билеты`}
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <FixedTicketButton operator={event.operator} eventId={event.eventId} orgId={event.orgId}/>
            <div className='relative flex flex-col gap-24 w-[90vw] xl:w-[1152px] pt-[88px]'>

                {md ? <HeroDesktop item={event}/> : <HeroMobile item={event}/>}

                {event.title === "Симфония Раммштайн" &&
                    <Disclaimer
                        firstArticle={
                            <>
                                <p>Организатор и исполнители не поддерживают официальную позицию немецкой метал-группы
                                    «Rammstein».</p>
                                Организатор и исполнители не несут ответственность за смысл текстов песен, а так же
                                любые высказывания и мнения метал-группы «Rammstein».
                                «Backstage group» не несёт ответственности за содержание авторских материалов.
                            </>}
                        secondArticle={
                            <>
                                <p>«Backstage group» несёт исключительно культурно-развлекательный характер</p>
                                и исполняет музыку метал-группы «Rammstein» в симфонической аранжировке.
                                Все персонажи являются вымышленными, и любое совпадение с реально живущими или жившими
                                людьми случайно.
                            </>}
                    />
                }

                {event.title === "Симфония Imagine Dragons" &&
                    <Disclaimer
                        firstArticle=
                            {<>
                                <p className='text-light-brown'>Организатор и исполнители не поддерживают официальную
                                    позицию группы «Imagine Dragons».</p>
                                Организатор и исполнители не несут ответственность за смысл текстов песен, а так же
                                любые высказывания и мнения группы «Imagine Dragons».
                                «Backstage group» не несёт ответственности за содержание авторских материалов.
                            </>}
                        secondArticle=
                            {<>
                                <p className='text-light-brown'>«Backstage group» несёт исключительно
                                    культурно-развлекательный характер</p>
                                и исполняет музыку группы «Imagine Dragons»
                                в симфонической аранжировке.
                                Все персонажи являются вымышленными, и любое совпадение с реально живущими или жившими
                                людьми случайно.
                            </>}
                    />
                }

                <Suspense fallback={<LoadingSpinner/>}>
                    <div className='flex flex-col gap-11'>
                        <h2><Text variant={TextVariant.H2}>ПОДРОБНЕЕ О КОНЦЕРТЕ</Text></h2>
                        <div
                            className={`sticky flex md:w-full w-[90vw] overflow-x-auto scrollbar-hide bg-bg-global z-10
                            ${headerIsVisible ? 'top-[76px]' : 'top-0'} transition-all duration-300`}
                        >
                            {menuItems.map((item) => (
                                <Tab
                                    key={item}
                                    size={xl ? TabButtonSize.medium : TabButtonSize.small}
                                    className='md:flex-1 text-nowrap p-2.5'
                                    isActive={item === activeSection}
                                    onClick={() => toggleMenu(item)}
                                >
                                    {item}
                                </Tab>
                            ))}
                        </div>
                        {renderContent()}
                    </div>
                </Suspense>

                <Suspense fallback={<LoadingSpinner/>}>
                    {(event.photos.length > 0 || event.videos.length > 0) &&
                        <GallerySection
                            photos={event.photos}
                            videos={event.videos}
                        />
                    }
                </Suspense>

                {events.length > 1 &&
                    <Suspense fallback={<LoadingSpinner/>}>
                        <UpcomingEvents events={events.filter((item) =>
                            item.eventId != event.eventId && item.city === event.city
                        )}
                        />
                    </Suspense>
                }
                <Suspense fallback={<LoadingSpinner/>}>
                    <NewsSection/>
                </Suspense>
            </div>
        </>
    );
};

export default EventPage;