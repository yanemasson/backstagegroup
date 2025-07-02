import {useParams} from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import useEvents from "../../hooks/cms/useEvents.ts";
import {SEO} from "../../components/SEO.tsx";
import createSlug from "../../utils/createSlug.ts";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import Header from "./sections/Header.tsx";
import {lazy, Suspense, useState} from "react";
import MenuItem from "../../components/MenuItem.tsx";
import Text, {TextVariant} from "../../components/Text.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import HeroDesktop from "./sections/HeroDesktop.tsx";
import HeroMobile from "./sections/HeroMobile.tsx";

const Information = lazy(() => import('./sections/Information'));
const TrackList = lazy(() => import('./sections/TrackList'));
const ArtistsSection = lazy(() => import('./sections/ArtistsSection'));
const LocationSection = lazy(() => import('./sections/LocationSection'));
const AboutUsSection = lazy(() => import('./sections/AboutUsSection'));
const ReportsSection = lazy(() => import('./sections/ReportsSection'));
const ReviewsSection = lazy(() => import('./sections/ReviewsSection'));
const UpcomingEvents = lazy(() => import('./sections/UpcomingEvents'));



const EventPage = () => {
    const {id} = useParams()
    const {events, isLoading} = useEvents()

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
                return <Information description={item.descriptionFull} poster={item.poster && item.poster} eventId={item.eventId} />
            case 'Трек-лист':
                return <TrackList trackList={item.trackList ? item.trackList : []} />
            case 'Исполнители':
                return <ArtistsSection
                        artists={item.artists ? item.artists : []}
                        artistsTeam={item.artistsTeam ? item.artistsTeam : ''}
                        artistsGroupPhoto={item.artistsGroupPhoto && item.artistsGroupPhoto}
                    />
            case 'Площадка':
                return <LocationSection photos={item.locationPhotos} location={item.location} eventId={item.eventId} address={item.address}/>
            default:
                return null
        }
    };

    return (
        <>
            <SEO
                title={`${item.title + ', ' + item.city} | Бэкстейдж, афиша, концерт, билеты`}
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <Header item={item}/>
            <div className='flex flex-col gap-[100px] w-[90vw] xl:w-[1166px] xl:gap-40'>
                {md ? <HeroDesktop item={item}/> : <HeroMobile item={item} />}
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
                            <Information description={item.descriptionFull} poster={item.poster && item.poster} eventId={item.eventId} />
                            {item.trackList && <TrackList trackList={item.trackList} />}
                            {item.artists && item.artists?.length > 0 &&
                                <ArtistsSection
                                    artistsGroupPhoto={item.artistsGroupPhoto && item.artistsGroupPhoto}
                                    artists={item.artists}
                                    artistsTeam={item.artistsTeam && item.artistsTeam}
                                />
                            }
                            {item.locationPhotos.length > 0 &&
                                <LocationSection
                                    photos={item.locationPhotos}
                                    location={item.location}
                                    eventId={item.eventId}
                                    address={item.address}
                                />
                            }
                            </>
                    }
                </Suspense>
                {events.length > 1 &&
                    <Suspense fallback={<LoadingSpinner />}>
                        <UpcomingEvents item={item} events={events} />
                    </Suspense>
                }
                <Suspense fallback={<LoadingSpinner />}>
                    <AboutUsSection />
                </Suspense>
                <section className='flex flex-col gap-[100px] xl:gap-40' id='reviews'>
                    <Suspense fallback={<LoadingSpinner />}>
                        <ReportsSection />
                    </Suspense>
                    <Suspense fallback={<LoadingSpinner />}>
                        <ReviewsSection />
                    </Suspense>
                </section>
            </div>
        </>
    );
};

export default EventPage;