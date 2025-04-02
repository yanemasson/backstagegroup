import Mute from '../../assets/icons/ic_mute.svg?react'
import UnMute from '../../assets/icons/ic_unmute.svg?react'

interface MuteButtonProps {
    isMuted: boolean
    isHovered: boolean
    toggleMute: () => void
}
const MuteButton = ({isMuted, toggleMute, isHovered}: MuteButtonProps) => {
    return (
        <button onClick={toggleMute} className={`text-white flex items-center justify-center w-[62px] h-[62px] rounded-full bg-light-brown
        ${isHovered ? ('opacity-90') : ('opacity-30')} 
        ${isMuted ? ('bg-light-brown') : ('bg-transparent')}`}>
            {isMuted ? (<Mute/>) : (<UnMute/>)}
        </button>
    );
};

export default MuteButton;