import {useEffect} from "react";
import LeftArrow from "./LeftArrow.tsx";
import RightArrow from "./RightArrow.tsx";
import CloseButton from "../Buttons/CloseButton.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import { useSwipeable } from 'react-swipeable';

interface SliderProps {
    mediaItems: string[]
    currentIndex: number
    setCurrentIndex: (arg1: number) => void
    isOpenSlider: boolean
    setIsOpenSlider: (arg0: boolean) => void
}
const Slider = ({mediaItems, currentIndex, setCurrentIndex, isOpenSlider, setIsOpenSlider}:SliderProps) => {
    useEffect(() => {
        if (isOpenSlider) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpenSlider]);

    const xl = useMediaBreakpoint('xl')

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1);
    };
    const goToNext = () => {
        setCurrentIndex(currentIndex === mediaItems.length - 1 ? 0 : currentIndex + 1);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => goToNext(),
        onSwipedRight: () => goToPrevious(),
        trackMouse: true
    })
    return (
        <div
            {...handlers}
            className={`fixed transition-all duration-500 ease-out inset-0 z-40 w-full flex items-center justify-center bg-black
            ${isOpenSlider ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <button onClick={goToPrevious} className={`absolute text-white left-0 p-8 z-50 ${!xl && 'hidden'}`}><LeftArrow /></button>
            <button onClick={goToNext} className={`absolute right-0 p-8 z-50 ${!xl && 'hidden'}`}><RightArrow /></button>
            <button onClick={() => setIsOpenSlider(false)} className='absolute right-0 top-0 p-8 z-50'><CloseButton /></button>
            <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full flex transition-transform duration-500 ease-out"
                     style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {mediaItems.map((src, index) => (
                        <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                            <img src={src} alt={`Slide ${index + 1}`} className="xl:h-full object-contain"/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
                {mediaItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full shadow-[0_0px_10px_3px_rgba(0,0,0,0.3)] 
              ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    )
};

export default Slider;