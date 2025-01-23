import Mute from '../assets/icons/ic_mute.svg?react'
import UnMute from '../assets/icons/ic_unmute.svg?react'

interface MuteButtonProps {
    isMuted: boolean
    isHovered: boolean
    toggleMute: () => void
}
const MuteButton = ({isMuted, toggleMute, isHovered}: MuteButtonProps) => {
    return (
        <button onClick={toggleMute} className={` absolute p-4 rounded-full bg-yellow transform transition-all duration-300 hover:opacity-90
        ${isHovered ? ('opacity-90') : ('opacity-30')} 
        ${isMuted ? ('bg-yellow') : ('bg-transparent text-black')}`}>
            {isMuted ? (<Mute/>) : (<UnMute/>)}
        </button>
    );
};

export default MuteButton;