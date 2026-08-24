import { useState, useCallback, useEffect } from 'react';
import { DrupalAPI } from '../../api/drupal';

export const useDrupalCities = (enabled: boolean = true) => {
    const [cities, setCities] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadCities = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const citiesList = await DrupalAPI.getCities();
            setCities(['Все города', ...citiesList]);
        } catch (err) {
            console.error('Ошибка при загрузке городов:', err);
            setError('Не удалось загрузить список городов');
            setCities([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!enabled) return;
        loadCities();
    }, [enabled, loadCities]);

    return {
        cities,
        isLoading,
        error,
        refreshCities: loadCities
    };
};
