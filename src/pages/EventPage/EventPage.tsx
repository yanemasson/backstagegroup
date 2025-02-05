import Information from "./sections/Information.tsx";
import {useParams} from "react-router";
import TrackList from "./sections/TrackList.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import {lazy, Suspense} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import useEvents from "../../hooks/cms/useEvents.ts";
import YandexMusic from "./sections/YandexMusic.tsx";
import {SEO} from "../../components/SEO.tsx";
import Text, {TextVariant} from "../../components/Text.tsx";
import createSlug from "../../utils/createSlug.ts";

const VideoSection = lazy(() => import("./sections/VideoSection.tsx")) ;
const Gallery = lazy(() => import("./sections/Gallery.tsx")) ;

const EventPage = () => {
    const {id} = useParams()
    const {events} = useEvents()

    const item= events.find(
        (c) => createSlug(c.title, c.city, c.concerts[0].date) === id)

    if(!item) {return <NotFoundPage/>}

    return (
        <>
            <SEO
                title={`${item.title + ', ' + item.city} | Бэкстейдж, афиша, концерт, билеты`}
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <div className='bg-black pb-20'>
                <Information item={item}/>
                <section id={'information'}>
                    <div className={'text-white px-5 lg:px-40 pt-10'}>
                        <Text variant={TextVariant.B}>О концерте:</Text>
                        <Text variant={TextVariant.P} style={'whitespace-pre-wrap'}>{item.descriptionFull}</Text>
                    </div>
                    <Suspense fallback={<LoadingSpinner/>}>
                        {item.videos && item.videos.length > 0 && (<VideoSection videos={item.videos} />)}
                        {item.photos && item.photos.length > 0 && (<Gallery photos={item.photos} />)}
                    </Suspense>
                    {item.trackList && <TrackList trackList={item.trackList}/>}
                    {item.playlistUrl && <YandexMusic playlist={item.playlistUrl}/>}
                </section>
            </div>
        </>

    );
};

export default EventPage;