import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import {useActiveSection} from "../../../hooks/useActiveSection.ts";
import {useEffect, useState} from "react";

interface FixedTicketButtonProps {
    eventId: number;
}

const FixedTicketButton = ({eventId}: FixedTicketButtonProps) => {
    const md = useMediaBreakpoint('md')
    const isHero = useActiveSection() === "hero";
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if(isHero) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [isHero]);
    
    return (
        <div className={`flex justify-center items-center md:justify-start  md:w-[1166px]
        z-30 fixed bottom-0 left-0 md:left-auto w-screen h-20 transition-all duration-300
        ${md ? 'bg-none' : 'bg-darkgray'}
        ${(md && isVisible) ? 'transform-none' : 'transform md:translate-y-[300px]'}
        `}
        >
            <div className='md:pr-5 md:py-4 md:bg-darkgray '>
                <TicketButton className='w-[90vw] h-[45px] md:w-[335px] md:h-[53px]' eventId={eventId}/>
            </div>
        </div>
    );
};

export default FixedTicketButton;