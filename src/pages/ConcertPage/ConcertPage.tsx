import Information from "./sections/Information.tsx";
import {useParams} from "react-router";
import TrackList from "./sections/TrackList.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import {lazy, Suspense} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import useConcerts from "../../hooks/useConcerts.ts";
import YandexMusic from "./sections/YandexMusic.tsx";
import {SEO} from "../../components/SEO.tsx";

const VideoSection = lazy(() => import("./sections/VideoSection.tsx")) ;
const Gallery = lazy(() => import("./sections/Gallery.tsx")) ;

const ConcertPage = () => {
    const {id} = useParams()
    const {concerts} = useConcerts()


    const createSlug = (title: string, city: string) => {
        return `${title}_${city}`
            .toLowerCase()
            .replace(/[^a-zа-яё0-9-\s]/g, '')
            .replace(/\s+/g, '_')
            .replace(/-+/g, '_');
    };
    const item= concerts.find(
        (c) => createSlug(c.title, c.city) === id)

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
                {item.trackList && <TrackList trackList={item.trackList}/>}
                {item.playlistUrl && <YandexMusic playlist={item.playlistUrl}/>}
                <Suspense fallback={<LoadingSpinner/>}>
                    {item.videos && item.videos.length > 0 && (<VideoSection videos={item.videos} />)}
                    {item.photos && item.photos.length > 0 && (<Gallery photos={item.photos} />)}
                </Suspense>
            </div>
        </>

    );
};

export default ConcertPage;