import PlayIcon from "../../assets/icons/video/ic_play.svg?react"
import PauseIcon from "../../assets/icons/video/ic_pause.svg?react"
import IconButton, {IconButtonSize, IconButtonVariant} from "../Buttons/IconButton.tsx";

interface PlayButtonProps {
    isPlaying: boolean
    togglePlay: () => void
}

const PlayButton = ({isPlaying, togglePlay}: PlayButtonProps) => {
    return (
        <IconButton
            variant={IconButtonVariant.FilledSecondary}
            size={IconButtonSize.large}
            aria-label={isPlaying ? "Приостановить" : 'Воспроизвести'}
            aria-pressed={isPlaying ? "true" : "false"}
            onClick={togglePlay}
            className="rounded-full"
        >
            {isPlaying
                ? <PauseIcon/>
                : <PlayIcon/>
            }
        </IconButton>
    );
};

export default PlayButton;