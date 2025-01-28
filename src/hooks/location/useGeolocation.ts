import { useEffect } from 'react';
import { useCity } from './useCity.ts';

export const useGeolocation = () => {
    const { setSelectedCity } = useCity();

    useEffect(() => {
        const detectCity = async () => {
            try {
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
                if (data.location?.data?.city) {
                    setSelectedCity(data.location.data.city);
                }
            } catch (error) {
                console.error('Ошибка при определении города:', error);
            }
        };
        const savedCity = localStorage.getItem('selectedCity');
        if (savedCity) {
            setSelectedCity(savedCity);
        } else {
            detectCity();
        }
    }, []);
};
