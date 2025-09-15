import { useState, useEffect } from 'react';

interface slideShowProps {
    slides: string[]
}

const SlideShow = ({slides}:slideShowProps) => {


    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        }, 4000);

        return () => clearInterval(interval);
    }, [slides]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div
                className="relative w-full h-full flex transition-transform duration-1000 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {slides.map((src, i) => (
                    <div key={i} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                        <img src={src} alt={`Слайд ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlideShow;
