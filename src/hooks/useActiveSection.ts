import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export const useActiveSection = () => {
    const [activeSection, setActiveSection] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        setActiveSection('');
        const timer = setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    const visibleEntries = entries.filter(entry => entry.intersectionRatio > 0);
                    if (visibleEntries.length === 0) return;

                    const mostVisible = visibleEntries.reduce((max, entry) => {
                        return (entry.intersectionRatio > max.intersectionRatio)
                            ? entry
                            : max;
                    }, visibleEntries[0]);

                    setActiveSection(mostVisible.target.id);
                },
                {
                    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    rootMargin: '-100px 0px -100px 0px'
                }
            );

            const sections = document.querySelectorAll('section[id]');
            sections.forEach((section) => observer.observe(section));

            return () => observer.disconnect();
        }, 100);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return activeSection;
};
