import Information from "./sections/Information.tsx";
import Gallery from "./sections/Gallery.tsx";
import VideoSection from "./sections/VideoSection.tsx";
import {useParams} from "react-router";
import {ConcertListData} from "../../data/concertListData.ts";

const ConcertPage = () => {
    const {id} = useParams()
    const item = ConcertListData[Number(id!)];
    return (
        <>
            <Information item={item}/>
            {item.photos && <Gallery photos={item.photos}/>}
            {item.videos && <VideoSection videos={item.videos}/>}
        </>
    );
};

export default ConcertPage;