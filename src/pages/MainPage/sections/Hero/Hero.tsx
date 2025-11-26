import {useCallback, useEffect, useState} from "react";
import {DrupalAPI} from "../../../../api/drupal.ts";
import {Event} from '../../../../types/event.ts'
import EventCardSlide from "../../components/EventCardSlide.tsx";
import LoadingSpinner from "../../../../components/LoadingSpinner.tsx";
import {useCity} from "../../../../hooks/geolocation/useCity.ts";
import MiniEventCardSlide from "../../components/MiniEventCardSlide.tsx";


const Hero = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [slideEvents, setSlideEvents] = useState<Event[]>([]);
    const [index, setIndex] = useState(0);
    const slideTime = 4000

    const {selectedCity} = useCity();

    const getVisibleMiniSlides = useCallback(() => {
        if (slideEvents.length <= 3) {
            return slideEvents.map((_, i) => i);
        }

        // Показываем текущий слайд и два предыдущих
        let startIndex = index - 2;
        if (startIndex < 0) {
            startIndex = slideEvents.length + startIndex;
        }

        const indices = [];
        for (let i = 0; i < 3; i++) {
            indices.push((startIndex + i) % slideEvents.length);
        }

        return indices;
    }, [slideEvents, index]);

    const visibleIndices = getVisibleMiniSlides();

    const handleNextSlide = useCallback(() => {
        setIndex((prevIndex) => (prevIndex === slideEvents.length - 1 ? 0 : prevIndex + 1));
    }, [slideEvents.length]);

    const handleSlideClick = useCallback((clickedIndex: number) => {
        setIndex(clickedIndex);
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const eventsList = await DrupalAPI.getEvents();
                setSlideEvents(eventsList
                    .filter((item) => item.poster && item.city === selectedCity)
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
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
        <section className='md:w-[1166px] w-screen overflow-hidden' id='hero'>
            <div
                className="relative md:w-[1166px] w-screen h-full flex transition-transform duration-1000 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {slideEvents
                    .map((event, i) => (
                        <div key={`slide-${event.eventId}-${i}`} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                            <EventCardSlide event={event} />
                        </div>
                    ))
                }
            </div>

            <div className='flex overflow-auto md:overflow-hidden'>
                {visibleIndices.map((slideIndex, i) => (
                    <div key={`mini-${slideIndex}-${slideEvents[slideIndex].eventId}`} className="relative ">
                        <MiniEventCardSlide
                            event={slideEvents[slideIndex]}
                            isActive={slideIndex === index}
                            onClick={() => handleSlideClick(slideIndex)}
                            duration={slideTime}
                            onComplete={slideIndex === index ? handleNextSlide : undefined}
                            isLast={i === 2}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Hero;