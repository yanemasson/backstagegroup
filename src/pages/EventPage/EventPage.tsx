import {useParams} from "react-router";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import useEvents from "../../hooks/cms/useEvents.ts";
import {SEO} from "../../components/SEO.tsx";
import createSlug from "../../utils/createSlug.ts";
import UpcomingEvents from "./sections/UpcomingEvents.tsx";
import ReviewsSection from "./sections/ReviewsSection.tsx";
import ReportsSection from "./sections/ReportsSection.tsx";
import AboutUsSection from "./sections/AboutUsSection.tsx";
import LocationSection from "./sections/LocationSection.tsx";
import TrackList from "./sections/TrackList.tsx";
import ArtistsSection from "./sections/ArtistsSection.tsx";
import Information from "./sections/Information.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import HeroDesktop from "./sections/HeroDesktop.tsx";
import HeroMobile from "./sections/HeroMobile.tsx";
import Header from "./sections/Header.tsx";

const EventPage = () => {
    const {id} = useParams()
    const {events, isLoading} = useEvents()
    const xl = useMediaBreakpoint('xl')

    if(isLoading) {return <div><LoadingSpinner/></div>}

    const item= events.find((c) => createSlug(c.eventId) === id)

    if(!item) {return <NotFoundPage/>}

    return (
        <>
            <SEO
                title={`${item.title + ', ' + item.city} | Бэкстейдж, афиша, концерт, билеты`}
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <Header item={item}/>
            <div className='flex flex-col gap-[100px] w-[320px] xl:w-[1166px] xl:gap-40'>
                {xl ? <HeroDesktop item={item}/> : <HeroMobile item={item} />}
                <Information description={item.descriptionFull} eventId={item.eventId}/>
                {item.trackList && item.trackList.length > 0 && <TrackList trackList={item.trackList}/>}
                {item.artists?.length && <ArtistsSection artists={item.artists} artistsTeam={item.artistsTeam ? item.artistsTeam : undefined} />}
                <LocationSection location={item.location} eventId={item.eventId} address={item.address}/>
                <AboutUsSection/>
                <section id='reviews'>
                    <ReportsSection/>
                    <ReviewsSection/>
                </section>
                <UpcomingEvents item={item} events={events} />
            </div>
        </>

    );
};

export default EventPage;