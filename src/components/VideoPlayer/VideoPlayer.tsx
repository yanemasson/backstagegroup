import {useRef, useState} from "react";
import PlayButton from "./PlayButton.tsx";

interface VideoPlayerProps {
    video: string
    className?: string
}

const VideoPlayer = ({video, className}:VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

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
            <div className={` overflow-hidden flex items-center justify-center ${className} `}>
                <video className='object-cover' ref={videoRef} preload="auto">
                    <source src={video} type={'video/mp4'} />
                </video>
                <div className='absolute'>
                    <PlayButton isPlaying={isPlaying} togglePlay={togglePlay}/>
                </div>
            </div>
    );
};

export default VideoPlayer;