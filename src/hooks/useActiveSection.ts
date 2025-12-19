import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export const useActiveSection = () => {
    const [activeSection, setActiveSection] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        setActiveSection('');

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSection = entries.find(entry => entry.intersectionRatio >= 0.5);

                if (visibleSection) {
                    setActiveSection(visibleSection.target.id);
                }
            },
            {
                threshold: 0.5,
                rootMargin: '-50px 0px -50px 0px'
            }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [location.pathname]);

    return activeSection;
};