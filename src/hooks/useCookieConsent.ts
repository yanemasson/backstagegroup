// hooks/useCookieConsent.ts
import { useState, useEffect } from 'react';
import { CookiePreferences } from '../types/cookie';

export const useCookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>();

    useEffect(() => {
        const savedPreferences = localStorage.getItem('cookiePreferences');
        if (savedPreferences) {
            const prefs = JSON.parse(savedPreferences);
            setCookiePreferences(prefs);
        } else {
            setShowBanner(true);
        }
    }, []);

    const acceptAll = () => {
        const preferences: CookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        savePreferences(preferences);
    };

    const rejectAll = () => {
        const preferences: CookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        savePreferences(preferences);
    };

    const customize = (preferences: CookiePreferences) => {
        savePreferences(preferences);
    };

    useEffect(() => {
        let isMounted = true;

        const loadPreferences = async () => {
            try {
                const savedPreferences = localStorage.getItem('cookiePreferences');
                if (savedPreferences && isMounted) {
                    const prefs = JSON.parse(savedPreferences);
                    setCookiePreferences(prefs);
                } else if (isMounted) {
                    setShowBanner(true);
                }
            } catch (error) {
                console.error('Error reading cookie preferences:', error);
                if (isMounted) setShowBanner(true);
            }
        };

        loadPreferences();

        return () => {
            isMounted = false;
        };
    }, []);

    const savePreferences = (preferences: CookiePreferences) => {
        setCookiePreferences(preferences);
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        setShowBanner(false);
    };

    return {
        showBanner,
        cookiePreferences,
        acceptAll,
        rejectAll,
        customize,
        setShowBanner
    };
};
