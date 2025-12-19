import {useCallback, useEffect, useRef, useState} from "react";
import {DrupalAPI} from "../../../../api/drupal.ts";
import {Event} from '../../../../types/event.ts'
import EventCardSlide from "../../components/EventCardSlide.tsx";
import LoadingSpinner from "../../../../components/LoadingSpinner.tsx";
import {useCity} from "../../../../hooks/geolocation/useCity.ts";


const Hero = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [slideEvents, setSlideEvents] = useState<Event[]>([]);
    const [index, setIndex] = useState(0);

    const [progress, setProgress] = useState(0);
    const slideTime = 4000
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const {selectedCity} = useCity();

    const handleBarClick = useCallback((index: number) => {
        setIndex(index);
        setProgress(0);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex === slideEvents.length - 1 ? 0 : prevIndex + 1));
            setProgress(0);
        }, slideTime);
    }, [slideEvents.length])

    const handleNextSlide = useCallback(() => {
        setIndex((prevIndex) => (prevIndex === slideEvents.length - 1 ? 0 : prevIndex + 1));
        setProgress(0);
    }, [slideEvents.length]);

    // прогресс
    useEffect(() => {
        if (slideEvents.length <= 1) return;

        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const currentProgress = Math.min((elapsed / slideTime) * 100, 100);
            setProgress(currentProgress);
        }, 50);

        return () => clearInterval(interval);
    }, [index, slideEvents.length, slideTime]);

    // автоматическое переключение
    useEffect(() => {
        if (slideEvents.length <= 1) return;

        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
        }

        intervalRef.current = setTimeout(() => {
            handleNextSlide();
        }, slideTime);

        return () => {
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
            }
        };
    }, [index, slideEvents.length, handleNextSlide, slideTime]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                let eventsList
                if(selectedCity) {
                    eventsList = await DrupalAPI.getEventsByCity(selectedCity);
                } else {
                    eventsList = await DrupalAPI.getEventsByCity('Все города');
                }
                setSlideEvents(eventsList.slice(0, 3))
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [selectedCity]);

    if(loading) return <LoadingSpinner/>;
    if (error) return <div>{error}</div>;

    return (
        <section className='w-screen xl:w-[99vw] h-screen overflow-hidden' id='hero'>
            <div
                className="relative w-full h-full flex transition-transform duration-1000 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {slideEvents
                    .map((event, index) => (
                        <div key={`slide-${event.eventId}-${index}`} className="w-full h-full flex-shrink-0">
                            <EventCardSlide event={event} activeIndex={index} progress={progress} handleBarClick={handleBarClick} />
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Hero;