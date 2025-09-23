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
import {Event} from '../../types/event.ts'
import MenuItemButton from "./components/MenuItemButton.tsx";
import FixedTicketButton from "./components/FixedTicketButton.tsx";
import Disclaimer from "./sections/Disclaimer.tsx";

const Information = lazy(() => import('./sections/Information'));
const TrackList = lazy(() => import('./sections/TrackList'));
const ArtistsSection = lazy(() => import('./sections/ArtistsSection'));
const LocationSection = lazy(() => import('./sections/LocationSection'));
const AboutUsSection = lazy(() => import('../MainPage/sections/AboutUs/AboutUs'));
const ReviewsSection = lazy(() => import('./sections/ReviewsSection'));
const UpcomingEvents = lazy(() => import('./sections/UpcomingEvents'));


const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState<Event | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) {
                setError('Event ID не указан');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const eventData = await DrupalAPI.getEventByEventId(id);
                setEvent(eventData);

                if (!eventData) {
                    setError(`Событие с ID ${id} не найдено`);
                }
            } catch (err) {
                console.error('Error loading event:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);

                const eventsData = await DrupalAPI.getEvents();
                setEvents(eventsData);

                if (!eventsData) {
                    setError(`События не найдены`);
                }
            } catch (err) {
                console.error('Error loading events:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [id]);

    type menuItemType = 'Описание программы' | 'Трек-лист' | 'Исполнители' | 'Площадка' | null
    const [activeSection, setActiveSection] = useState<menuItemType>('Описание программы')
    const menuItems: menuItemType[] = ['Описание программы', 'Трек-лист', 'Исполнители', 'Площадка']

    const toggleMenu = (item: menuItemType) => {
        if(item === activeSection) {
            return setActiveSection(null)
        }
        setActiveSection(item)
    }

    const md = useMediaBreakpoint('md')

    if(loading) return <LoadingSpinner/>
    if(!event) return <NotFoundPage/>
    if(error) return <>{error}</>

    const renderContent = () => {
        switch(activeSection) {
            case 'Описание программы':
                return <Information description={event.descriptionFull} poster={event.poster && event.poster} />
            case 'Трек-лист':
                return <TrackList trackList={event.trackList ? event.trackList : []} />
            case 'Исполнители':
                return <ArtistsSection
                        artists={event.artists ? event.artists : []}
                        artistsTeam={event.artistsTeam ? event.artistsTeam : ''}
                        artistsGroupPhoto={event.artistsGroupPhoto && event.artistsGroupPhoto}
                    />
            case 'Площадка':
                return <LocationSection photos={event.locationPhotos} location={event.location} eventId={event.eventId} address={event.address}/>
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
            <FixedTicketButton eventId={event.eventId}/>
            <div className='relative flex flex-col gap-[100px] w-[90vw] xl:w-[1166px]'>

                {md ? <HeroDesktop item={event}/> : <HeroMobile item={event} />}

                {event.title === "Симфония Раммштайн" &&
                    <Disclaimer
                        firstArticle=
                            {<>
                                <p className='text-light-brown'>Организатор и исполнители не поддерживают официальную позицию немецкой метал-группы «Rammstein».</p>
                                Организатор и исполнители не несут ответственность за смысл текстов песен, а так же любые высказывания и мнения метал-группы «Rammstein».
                                «Backstage group» не несёт ответственности за содержание авторских материалов.
                            </>}
                        secondArticle=
                            {<>
                                <p className='text-light-brown'>«Backstage group» несёт исключительно культурно-развлекательный характер</p>
                                и исполняет музыку метал-группы «Rammstein»
                                в симфонической аранжировке.
                                Все персонажи являются вымышленными, и любое совпадение с реально живущими или жившими людьми случайно.
                            </>}
                        />
                }

                {event.title === "Симфония Imagine Dragons" &&
                    <Disclaimer
                        firstArticle=
                            {<>
                                <p className='text-light-brown'>Организатор и исполнители не поддерживают официальную позицию группы «Imagine Dragons».</p>
                                Организатор и исполнители не несут ответственность за смысл текстов песен, а так же любые высказывания и мнения группы «Imagine Dragons».
                                «Backstage group» не несёт ответственности за содержание авторских материалов.
                            </>}
                        secondArticle=
                            {<>
                                <p className='text-light-brown'>«Backstage group» несёт исключительно культурно-развлекательный характер</p>
                                и исполняет музыку группы «Imagine Dragons»
                                в симфонической аранжировке.
                                Все персонажи являются вымышленными, и любое совпадение с реально живущими или жившими людьми случайно.
                            </>}
                    />
                }

                <Suspense fallback={<LoadingSpinner />}>
                    <div className='flex flex-col items-start gap-[50px] w-[90vw] md:w-full '>
                        <div className='flex gap-6 md:gap-[30px] overflow-auto w-[90vw] md:w-full'>
                            {menuItems.map((item) => (
                                <MenuItemButton
                                    key={item}
                                    isActive={item === activeSection}
                                    setActive={() => toggleMenu(item)}>
                                    <Text variant={TextVariant.P}>{item}</Text>
                                </MenuItemButton>
                            ))}
                        </div>
                        {renderContent()}
                    </div>
                </Suspense>
                {events.length > 1 &&
                    <Suspense fallback={<LoadingSpinner />}>
                        <UpcomingEvents
                            item={event}
                            events={events.filter((item) =>
                                item.eventId != event.eventId && item.city === event.city
                            )}
                        />
                    </Suspense>
                }
                <Suspense fallback={<LoadingSpinner />}>
                    <AboutUsSection />
                </Suspense>
                <section className='flex flex-col gap-[100px] xl:gap-40' id='reviews'>
                    <Suspense fallback={<LoadingSpinner />}>
                        <ReviewsSection />
                    </Suspense>
                </section>
            </div>
        </>
    );
};

export default EventPage;