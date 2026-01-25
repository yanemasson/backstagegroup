import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";

export const useActiveSection = () => {
    const [activeSection, setActiveSection] = useState<string>('hero'); // Устанавливаем по умолчанию
    const location = useLocation();
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;

        const updateActiveSection = () => {
            if (!mountedRef.current) return;

            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';
            let maxVisibility = 0;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Рассчитываем, какая часть секции видна
                const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                const visibility = Math.max(0, visibleHeight / Math.min(rect.height, windowHeight));

                if (visibility > maxVisibility) {
                    maxVisibility = visibility;
                    currentSection = section.id;
                }
            });

            // Если нашли секцию с достаточной видимостью
            if (maxVisibility > 0.3 && currentSection) {
                setActiveSection(currentSection);
            }
        };

        // Запускаем немедленно
        updateActiveSection();

        // Настраиваем IntersectionObserver для отслеживания скролла
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: [0.1, 0.3, 0.5, 0.7, 1],
                rootMargin: '-50px 0px -50px 0px'
            }
        );

        // Начинаем наблюдение
        setTimeout(() => {
            const sections = document.querySelectorAll('section[id]');
            sections.forEach((section) => observer.observe(section));
        }, 100);

        // Также обновляем при скролле
        const handleScroll = () => {
            updateActiveSection();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            mountedRef.current = false;
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, [location.pathname]);

    return activeSection;
};