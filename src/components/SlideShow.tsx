import { useState, useEffect } from 'react';

const SlideShow = () => {
    const slides = [
        '/images/hero/1240х760 (1).jpg',
        '/images/hero/1240х760.jpg',
        '/images/hero/1200х800_маэстро.jpg',
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        }, 4000);

        return () => clearInterval(interval);
    }, [slides.length]);

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
