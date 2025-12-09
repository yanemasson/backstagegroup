import {useRef, useState, useCallback, useEffect, RefObject} from 'react';

interface UseHorizontalScrollProps {
    scrollAmount: number;
}

interface UseHorizontalScrollReturn {
    containerRef: RefObject<HTMLDivElement>;
    canScrollLeft: boolean;
    canScrollRight: boolean;
    scrollLeft: () => void;
    scrollRight: () => void;
    checkScrollButtons: () => void;
}

export const useHorizontalScroll = ({scrollAmount}: UseHorizontalScrollProps): UseHorizontalScrollReturn => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const checkScrollButtons = useCallback(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = container;

        // Небольшая погрешность для избежания ошибок округления
        const epsilon = 1;

        setCanScrollLeft(scrollLeft > epsilon);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - epsilon);
    }, []);

    const scrollLeft = useCallback(() => {
        if (!containerRef.current) return;

        containerRef.current.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth' ,
        });
    }, [scrollAmount]);

    const scrollRight = useCallback(() => {
        if (!containerRef.current) return;

        containerRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });
    }, [scrollAmount]);

    // Инициализация
    useEffect(() => {
        if (!containerRef.current || isInitialized) return;

        const init = () => {
            checkScrollButtons();
            setIsInitialized(true);
        };

        // Маленькая задержка для гарантии отрисовки
        const timer = setTimeout(init, 50);

        return () => clearTimeout(timer);
    }, [checkScrollButtons, isInitialized]);

    // Обработчики событий
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            checkScrollButtons();
        };

        const handleResize = () => {
            checkScrollButtons();
        };

        container.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [checkScrollButtons]);

    return {
        containerRef,
        canScrollLeft,
        canScrollRight,
        scrollLeft,
        scrollRight,
        checkScrollButtons,
    };
};