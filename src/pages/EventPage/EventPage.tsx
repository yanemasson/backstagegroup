import {useParams} from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import {SEO} from "../../components/SEO.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import Header from "./sections/Header.tsx";
import {lazy, Suspense, useEffect, useState} from "react";
import MenuItem from "../../components/MenuItem.tsx";
import Text, {TextVariant} from "../../components/Text.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import HeroDesktop from "./sections/HeroDesktop.tsx";
import HeroMobile from "./sections/HeroMobile.tsx";
import {DrupalAPI} from "../../api/drupal.ts";
import { Event } from '../../types/event.ts'

const Information = lazy(() => import('./sections/Information'));
const TrackList = lazy(() => import('./sections/TrackList'));
const ArtistsSection = lazy(() => import('./sections/ArtistsSection'));
const LocationSection = lazy(() => import('./sections/LocationSection'));
const AboutUsSection = lazy(() => import('./sections/AboutUsSection'));
const ReviewsSection = lazy(() => import('./sections/ReviewsSection'));
// const UpcomingEvents = lazy(() => import('./sections/UpcomingEvents'));


const EventPage = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState<Event | null>(null); // Изменено: event вместо events
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

        fetchEvent(); // Добавлено: вызов функции
    }, [id]); // Добавлено: зависимость от id

    type menuItemType = 'Описание' | 'Трек-лист' | 'Исполнители' | 'Площадка' | null
    const [activeSection, setActiveSection] = useState<menuItemType>('Описание')
    const menuItems: menuItemType[] = ['Описание', 'Трек-лист', 'Исполнители', 'Площадка']

    const toggleMenu = (item: menuItemType) => {
        if(item === activeSection) {
            return setActiveSection(null)
        }
        setActiveSection(item)
    }

    const xl = useMediaBreakpoint('xl')
    const md = useMediaBreakpoint('md')

    if(loading) return <LoadingSpinner/>
    if(!event) return <NotFoundPage/>
    if(error) return <>{error}</>

    const renderContent = () => {
        switch(activeSection) {
            case 'Описание':
                return <Information description={event.descriptionFull} poster={event.poster && event.poster} eventId={event.eventId} />
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
            <Header item={event}/>
            <div className='flex flex-col gap-[100px] w-[90vw] xl:w-[1166px] xl:gap-40'>
                {md ? <HeroDesktop item={event}/> : <HeroMobile item={event} />}
                <Suspense fallback={<LoadingSpinner />}>
                    {!xl ? <div className='flex flex-col items-center gap-[50px]'>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-2.5'>
                                {menuItems.map((item) => (
                                    <MenuItem
                                        key={item}
                                        isActive={item === activeSection}
                                        onClick={() => toggleMenu(item)}>
                                        <Text variant={TextVariant.P}>{item}</Text>
                                    </MenuItem>
                                ))}
                            </div>
                            {renderContent()}
                    </div>
                        : <>
                            <Information description={event.descriptionFull} poster={event.poster && event.poster} eventId={event.eventId} />
                            {event.trackList && <TrackList trackList={event.trackList} />}
                            {event.artists && event.artists?.length > 0 &&
                                <ArtistsSection
                                    artistsGroupPhoto={event.artistsGroupPhoto && event.artistsGroupPhoto}
                                    artists={event.artists}
                                    artistsTeam={event.artistsTeam && event.artistsTeam}
                                />
                            }
                            {event.locationPhotos.length > 0 &&
                                <LocationSection
                                    photos={event.locationPhotos}
                                    location={event.location}
                                    eventId={event.eventId}
                                    address={event.address}
                                />
                            }
                            </>
                    }
                </Suspense>
                {/*{events.length > 1 &&*/}
                {/*    <Suspense fallback={<LoadingSpinner />}>*/}
                {/*        <UpcomingEvents item={event} events={events} />*/}
                {/*    </Suspense>*/}
                {/*}*/}
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