// hooks/useCookieConsent.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import { CookiePreferences } from '../types/cookie';

export const useCookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>();
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    useEffect(() => {
        const savedPreferences = localStorage.getItem('cookiePreferences');
        if (savedPreferences) {
            const prefs = JSON.parse(savedPreferences);
            setCookiePreferences(prefs);
        } else {
            // Не показываем сразу, ждем взаимодействия
            const handleInteraction = () => {
                setHasUserInteracted(true);
                setShowBanner(true);
                // Удаляем обработчики после первого взаимодействия
                ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
                    document.removeEventListener(event, handleInteraction);
                });
            };

            // Добавляем обработчики событий
            ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
                document.addEventListener(event, handleInteraction, { once: true });
            });

            // Показываем баннер через 10 секунд, даже если не было взаимодействия
            const timeoutId = setTimeout(() => {
                if (!hasUserInteracted) {
                    setShowBanner(true);
                }
            }, 10000);

            return () => {
                clearTimeout(timeoutId);
                ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
                    document.removeEventListener(event, handleInteraction);
                });
            };
        }
    }, [hasUserInteracted]);

    const savePreferences = useCallback((preferences: CookiePreferences) => {
        setCookiePreferences(preferences);
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        setShowBanner(false);
    }, []);

    const acceptAll = useCallback(() => {
        savePreferences({
            necessary: true,
            analytics: true,
            marketing: true
        });
    }, [savePreferences]);

    const rejectAll = useCallback(() => {
        savePreferences({
            necessary: true,
            analytics: false,
            marketing: false
        });
    }, [savePreferences]);

    const customize = useCallback((preferences: CookiePreferences) => {
        savePreferences(preferences);
    }, [savePreferences]);

    return useMemo(
        () => ({
            showBanner,
            cookiePreferences,
            acceptAll,
            rejectAll,
            customize,
            setShowBanner
        }),
        [showBanner, cookiePreferences, acceptAll, rejectAll, customize]
    );
};