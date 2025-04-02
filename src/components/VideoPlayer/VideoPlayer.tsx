import {useRef, useState} from "react";
import PlayButton from "./PlayButton.tsx";
import MuteButton from "./MuteButton.tsx";

interface VideoPlayerProps {
    video: string
    className?: string
    buttonType?: 'play' | 'mute'
}

const VideoPlayer = ({video, className, buttonType = 'play'}:VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(buttonType === 'mute');
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

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }

    return (
        <div className={`overflow-hidden flex items-center justify-center ${className}`}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
            <video className='object-cover' ref={videoRef} preload="metadata"
                   autoPlay={buttonType === "mute"} playsInline loop muted={isMuted}>
                <source src={video} type={'video/mp4'} />
            </video>
            <div className='absolute'>
                {buttonType === "play" && <PlayButton isHovered={isHovered} isPlaying={isPlaying} togglePlay={togglePlay}/>}
                {buttonType === "mute" && <MuteButton isHovered={isHovered} isMuted={isMuted} toggleMute={toggleMute}/>}
            </div>
        </div>

    );
};

export default VideoPlayer;