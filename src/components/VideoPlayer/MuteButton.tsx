import MuteIcon from '../../assets/icons/video/ic_mute.svg?react'
import UnMuteIcon from '../../assets/icons/video/ic_unmute.svg?react'
import IconButton, {IconButtonSize, IconButtonVariant} from "../Buttons/IconButton.tsx";

interface MuteButtonProps {
    isMuted: boolean
    toggleMute: () => void
}

const MuteButton = ({isMuted, toggleMute}: MuteButtonProps) => {
    return (
        <IconButton
            variant={IconButtonVariant.FilledSecondary}
            size={IconButtonSize.large}
            aria-label={isMuted ? "Включить звук" : 'Отключить звук'}
            aria-pressed={isMuted ? "false" : "true"}
            onClick={toggleMute}
            className="rounded-full"
        >
            {isMuted
                ? <MuteIcon/>
                : <UnMuteIcon/>
            }
        </IconButton>
    );
};

export default MuteButton;