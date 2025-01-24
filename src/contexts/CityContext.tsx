import { createContext, useState, useEffect, ReactNode } from 'react';

interface CityContextType {
    selectedCity: string | null;
    setSelectedCity: (city: string | null) => void;
    isLoading: boolean;
}

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
                            "Authorization": "Token " + process.env.VITE_DADATA_API_KEY || import.meta.env.VITE_DADATA_API_KEY
                        }
                    }
                );
                const data = await response.json();
                if (data.location?.data?.city) {
                    setSelectedCity(data.location.data.city);
                    localStorage.setItem('selectedCity', data.location.data.city);
                }
            } catch (error) {
                console.error('Ошибка при определении города:', error);
            } finally {
                setIsLoading(false);
            }
        };

        detectCity();
    }, []);

    const handleSetCity = (city: string | null) => {
        setSelectedCity(city);
        if (city) {
            localStorage.setItem('selectedCity', city);
        } else {
            localStorage.removeItem('selectedCity');
        }
    };

    return (
        <CityContext.Provider
            value={{
                selectedCity,
                setSelectedCity: handleSetCity,
                isLoading
            }}
        >
            {children}
        </CityContext.Provider>
    );
};


