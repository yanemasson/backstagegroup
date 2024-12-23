import {useRef, useState} from "react";
import MuteButton from "../components/MuteButton.tsx";

interface VideoSectionProps {
    videos: string[]
}

const VideoSection = ({videos}:VideoSectionProps) => {
    const [isMuted, setIsMuted] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const toggleMute = () => {
        if (videoRef.current && 'paused' in videoRef.current) {
            if (!videoRef.current.paused ) {
                setIsMuted(!isMuted);
            } else {
                videoRef.current.play()
                    .then(() => setIsMuted(!isMuted))
                    .catch(console.error);
            }
        }
    };

    return (
        <section id='repertoire' className='flex flex-col px-5 lg:px-40 bg-black py-16'>
            <div className='flex relative items-center justify-center p-8 '>
                <video ref={videoRef} className='rounded-3xl'
                       preload="auto" autoPlay playsInline loop muted={isMuted}
                       onMouseEnter={() => setIsHovered(true)}
                       onMouseLeave={() => setIsHovered(false)}>
                    <source src={videos[0]} type={'video/mp4'} />
                </video>
                <MuteButton isHovered={isHovered} isMuted={isMuted} toggleMute={toggleMute}/>
            </div>
        </section>
    );
};

export default VideoSection;