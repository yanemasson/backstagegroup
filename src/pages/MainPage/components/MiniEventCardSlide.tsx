import Text, {TextVariant} from "../../../components/Text.tsx";
import {Event} from "../../../types/event.ts";
import {getDate} from "../../../utils/getDate.ts";
import {useEffect, useState} from "react";

interface MiniEventCardSlidProps {
    event: Event;
    duration: number;
    isActive: boolean;
    onComplete?: () => void;
    onClick?: () => void;
    isLast?: boolean;
}

const MiniEventCardSlide = ({event, duration, isActive, onComplete, isLast, onClick} : MiniEventCardSlidProps) => {
    const datetime = getDate(event.date)
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isActive) {
            setProgress(0);
            return;
        }
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100 && onComplete) {
                onComplete();
            }
        }, 50);

        return () => clearInterval(interval);
    }, [isActive, duration, onComplete]);

    return (
        <div
            onClick={onClick}
            className={`pt-[30px] cursor-pointer min-w-[271px] md:w-[394px] 
            ${isLast ? 'border-r-[2px] border-semi-darkgray' : ''}`}
        >
            <div className='flex flex-col gap-3 px-5 max-h-[98px]'>
                <Text variant={TextVariant.P} className="line-clamp-2">{event.title}</Text>
                <Text variant={TextVariant.P} className='text-lightgray'>{datetime.day + ' ' + datetime.monthStr}</Text>
            </div>

            <div className="w-full h-0.5 mt-5">
                <div
                    className="h-full bg-light-brown transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default MiniEventCardSlide;