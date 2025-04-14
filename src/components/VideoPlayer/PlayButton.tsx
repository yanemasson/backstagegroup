interface PlayButtonProps {
    isPlaying: boolean
    togglePlay: () => void
    isHovered: boolean
}

const PlayButton = ({isPlaying, togglePlay, isHovered}: PlayButtonProps) => {
    return (
        <button
            aria-label={isPlaying ? "Приостановить" : 'Воспроизвести'}
            aria-pressed={isPlaying ? "true" : "false"}
            onClick={togglePlay}
            className={`flex items-center justify-center w-[62px] h-[62px] rounded-full bg-light-brown
            ${isHovered ? ('opacity-90') : ('opacity-30')} `}
        >
            {isPlaying
                ? <div className="flex gap-2">
                    <div className="w-2 h-8 bg-white"></div>
                    <div className="w-2 h-8 bg-white"></div>
                </div>
                : <svg width="32" height="32" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                    <path d="M20 12L0 24L0 0L20 12Z" fill="white"/>
                </svg>
            }
        </button>
    );
};

export default PlayButton;