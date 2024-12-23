import {useEffect, useState} from "react";

export const useActiveSection = () => {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const mostVisible = entries.reduce((max, entry) => {
                    return (entry.intersectionRatio > max.intersectionRatio)
                        ? entry
                        : max;
                });
                if (mostVisible.intersectionRatio > 0) {
                    setActiveSection(mostVisible.target.id);
                    console.log(activeSection)
                }
            },
            {
                threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
                rootMargin: '-100px 0px -100px 0px'
            }
        );
        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [activeSection]);
    return activeSection;
};