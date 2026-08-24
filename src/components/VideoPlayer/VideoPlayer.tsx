import {useEffect, useRef, useState} from "react";
import PlayButton from "./PlayButton.tsx";
import MuteButton from "./MuteButton.tsx";

interface VideoPlayerProps {
    video: string | undefined
    poster?: string
    className?: string
    buttonType?: 'play' | 'mute'
}

const VideoPlayer = ({video, poster, className, buttonType = 'play'}:VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(buttonType === 'mute');
    const [isInView, setIsInView] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (entry.isIntersecting) setShouldLoad(true);
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const element = videoRef.current;
        if (!shouldLoad || !element) return;

        element.load();

        if (buttonType === 'mute') {
            element.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    }, [shouldLoad, buttonType]);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden flex items-center justify-center ${className}`}
        >
            <video
                className="object-cover w-full h-full"
                ref={videoRef}
                preload="metadata"
                playsInline
                loop
                muted={isMuted}
                width="100%"
                height="100%"
                poster={poster}
            >
                {shouldLoad && <source src={video} type="video/mp4" />}
            </video>

            {isInView && (
                <div className="absolute">
                    {buttonType === "play" && <PlayButton isPlaying={isPlaying} togglePlay={togglePlay}/>}
                    {buttonType === "mute" && <MuteButton isMuted={isMuted} toggleMute={toggleMute}/>}
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
