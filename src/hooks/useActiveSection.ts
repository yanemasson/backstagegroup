import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const MIN_VISIBILITY = 0.3;

export const useActiveSection = () => {
    const [activeSection, setActiveSection] = useState<string>('hero');
    const location = useLocation();

    useEffect(() => {
        let frame: number | null = null;
        let cancelled = false;

        const updateActiveSection = () => {
            frame = null;
            if (cancelled) return;

            const windowHeight = window.innerHeight;
            let currentSection = '';
            let maxVisibility = 0;

            document.querySelectorAll('section[id]').forEach((section) => {
                const rect = section.getBoundingClientRect();
                const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                const visibility = Math.max(0, visibleHeight / Math.min(rect.height, windowHeight));

                if (visibility > maxVisibility) {
                    maxVisibility = visibility;
                    currentSection = section.id;
                }
            });

            if (maxVisibility > MIN_VISIBILITY && currentSection) {
                setActiveSection(currentSection);
            }
        };

        const scheduleUpdate = () => {
            if (frame !== null) return;
            frame = window.requestAnimationFrame(updateActiveSection);
        };

        updateActiveSection();

        const observer = new IntersectionObserver(scheduleUpdate, {threshold: [0, MIN_VISIBILITY]});

        // Секции подгружаются лениво, поэтому наблюдение подключаем после первой отрисовки
        const attachTimeout = window.setTimeout(() => {
            if (cancelled) return;
            document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
            scheduleUpdate();
        }, 100);

        window.addEventListener('scroll', scheduleUpdate, {passive: true});
        window.addEventListener('resize', scheduleUpdate, {passive: true});

        return () => {
            cancelled = true;
            window.clearTimeout(attachTimeout);
            if (frame !== null) window.cancelAnimationFrame(frame);
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            observer.disconnect();
        };
    }, [location.pathname]);

    return activeSection;
};
