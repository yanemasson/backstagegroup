import { useState } from 'react';

interface CityOption {
    value: string;
    label: string;
}

export const useCitySearch = () => {
    const [cities, setCities] = useState<CityOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchCities = async (query: string) => {
        if (!query) {
            setCities([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Token " + import.meta.env.VITE_DADATA_API_KEY
                    },
                    body: JSON.stringify({
                        query,
                        from_bound: { value: "city" },
                        to_bound: { value: "city" },
                        count: 10,
                        locations: [
                            {
                                country: "Россия"
                            }
                        ],
                        restrict_value: true
                    })
                }
            );

            const data = await response.json();
            const cityOptions = data.suggestions.map((suggestion: any) => ({
                value: suggestion.data.city,
                label: suggestion.data.city
            }));

            setCities(cityOptions);
        } catch (error) {
            console.error('Ошибка при поиске городов:', error);
            setCities([]);
        } finally {
            setIsLoading(false);
        }
    };

    return { cities, isLoading, searchCities };
};