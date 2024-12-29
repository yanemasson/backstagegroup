import Information from "./sections/Information.tsx";
import {useParams} from "react-router";
import TrackList from "./sections/TrackList.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import {lazy, Suspense} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import useConcerts from "../../hooks/useConcerts.ts";

const VideoSection = lazy(() => import("./sections/VideoSection.tsx")) ;
const Gallery = lazy(() => import("./sections/Gallery.tsx")) ;

const ConcertPage = () => {
    const {id} = useParams()
    const {concerts} = useConcerts()
    if(!concerts[Number(id!)]) {return <NotFoundPage/>}
    const item = concerts[Number(id!)];

    return (
        <div className='bg-black'>
            <Information item={item}/>
            {item.trackList && item.trackList.length > 0 && (<TrackList trackList={item.trackList} />)}
            <Suspense fallback={<LoadingSpinner/>}>
                {item.videos && item.videos.length > 0 && (<VideoSection videos={item.videos} />)}
                {item.photos && item.photos.length > 0 && (<Gallery photos={item.photos} />)}
            </Suspense>

        </div>
    );
};

export default ConcertPage;