import Information from "./sections/Information.tsx";
import {useParams} from "react-router";
import {ConcertListData} from "../../data/concertListData.ts";
import TrackList from "./sections/TrackList.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import {lazy, Suspense} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";

const VideoSection = lazy(() => import("./sections/VideoSection.tsx")) ;
const Gallery = lazy(() => import("./sections/Gallery.tsx")) ;

const ConcertPage = () => {
    const {id} = useParams()
    if(!ConcertListData[Number(id!)]) {return <NotFoundPage/>}
    const item = ConcertListData[Number(id!)];
    return (
        <>
            <Information item={item}/>
            {item.trackList && <TrackList trackList={item.trackList}/>}
            <Suspense fallback={<LoadingSpinner/>}>
                {item.videos && <VideoSection videos={item.videos}/>}
                {item.photos && <Gallery photos={item.photos}/>}
            </Suspense>
        </>
    );
};

export default ConcertPage;