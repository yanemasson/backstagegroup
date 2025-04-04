import {useEffect, useRef, useState} from "react";
import PlayButton from "./PlayButton.tsx";
import MuteButton from "./MuteButton.tsx";
import LoadingSpinner from "../LoadingSpinner.tsx";

interface VideoPlayerProps {
    video: string
    className?: string
    buttonType?: 'play' | 'mute'
}

const VideoPlayer = ({video, className, buttonType = 'play'}:VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(buttonType === 'mute');
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {setIsLoaded(true)}, 500);
        return () => clearTimeout(timer);
    }, [buttonType]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(e => console.log("Воспроизведение не удалось:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className={`overflow-hidden flex items-center justify-center ${className}`}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
            {isLoaded ? (
                <video
                    className="object-cover w-full h-full"
                    ref={videoRef}
                    preload="metadata"
                    playsInline
                    loop
                    autoPlay={buttonType === "mute"}
                    muted={isMuted}
                    width="100%"
                    height="100%"
                >
                    <source src={video} type="video/mp4" />
                </video>
            ) : (
                <LoadingSpinner/>
            )}
            <div className="absolute">
                {buttonType === "play" && isLoaded && <PlayButton isHovered={isHovered} isPlaying={isPlaying} togglePlay={togglePlay}/>}
                {buttonType === "mute" && isLoaded && <MuteButton isHovered={isHovered} isMuted={isMuted} toggleMute={toggleMute}/>}
            </div>
        </div>
    );
};

export default VideoPlayer;