import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";

interface VideoSectionProps {
    videos: string[]
}

const VideoSection = ({videos}:VideoSectionProps) => {
    return (
        <section className='flex flex-col px-5 lg:px-40 bg-black py-16'>
            <VideoPlayer videos={videos}/>
        </section>
    );
};

export default VideoSection;