import { createContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';

interface CityContextType {
    selectedCity: string | null;
    setSelectedCity: (city: string | null) => void;
    isLoading: boolean;
}

const ALL_CITIES = 'Все города';

// eslint-disable-next-line react-refresh/only-export-components
export const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCity, setSelectedCity] = useState<string | null>(() => {
        return localStorage.getItem('selectedCity');
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const detectCity = async () => {
            try {
                // Проверяем, есть ли сохраненный город
                const savedCity = localStorage.getItem('selectedCity');
                if (savedCity) {
                    setSelectedCity(savedCity);
                    setIsLoading(false);
                    return;
                }
                // Если нет, определяем автоматически
                const response = await fetch(
                    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address",
                    {
                        method: "GET",
                        headers: {
                            "Accept": "application/json",
                            "Authorization": "Token " + import.meta.env.VITE_DADATA_API_KEY
                        }
                    }
                );
                const data = await response.json();
                const detected = data.location?.data?.city || ALL_CITIES;

                setSelectedCity(detected);
                localStorage.setItem('selectedCity', detected);
            } catch (error) {
                console.error('Ошибка при определении города:', error);
                setSelectedCity(ALL_CITIES);
                localStorage.setItem('selectedCity', ALL_CITIES);
            } finally {
                setIsLoading(false);
            }
        };

        detectCity();
    }, []);

    const handleSetCity = useCallback((city: string | null) => {
        setSelectedCity(city);
        if (city) {
            localStorage.setItem('selectedCity', city);
        } else {
            localStorage.removeItem('selectedCity');
        }
    }, []);

    const value = useMemo<CityContextType>(
        () => ({ selectedCity, setSelectedCity: handleSetCity, isLoading }),
        [selectedCity, handleSetCity, isLoading]
    );

    return (
        <CityContext.Provider value={value}>
            {children}
        </CityContext.Provider>
    );
};
