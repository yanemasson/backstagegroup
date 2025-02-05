import {useEffect, useState} from 'react';
import {useCity} from '../../../hooks/location/useCity.ts';
import {useCitySearch} from '../../../hooks/location/useCitySearch.ts';
import CloseButton from "../../../components/Buttons/CloseButton.tsx";
import Text, {TextVariant} from "../../../components/Text.tsx";

interface CityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CityModal = ({ isOpen, onClose }: CityModalProps) => {
    const { selectedCity, setSelectedCity } = useCity();
    const { cities, isLoading, searchCities } = useCitySearch();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (searchValue.length >= 2) {
            searchCities(searchValue);
        }
    }, [searchValue, searchCities]);

    const handleCitySelect = (cityName: string) => {
        setSelectedCity(cityName);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40"/>
            <div className="border-white p-3 border-solid fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            bg-black text-white rounded-3xl w-[90%] max-w-md h-[500px] flex flex-col z-50 shadow-white shadow-sm">
                <div className="shrink-0 p-5 border-b border-gray-200 flex justify-between items-center">
                    <Text variant={TextVariant.B}>Выберите город</Text>
                    <button className='w-10 h-10' onClick={onClose}>
                        <CloseButton/>
                    </button>
                </div>
                <div className="shrink-0 p-4 border-b border-gray-200">
                    <Text variant={TextVariant.P}>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Введите название города"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </Text>
                </div>

                {/* Контейнер для результатов */}
                <div className="flex-1 overflow-hidden"> {/* Контейнер с overflow-hidden */}
                    <div className="h-full overflow-y-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"/>
                            </div>
                        ) : (
                            <div className="h-full">
                                {searchValue.length >= 2 ? (
                                    <div className="divide-y divide-gray-100">
                                        {cities.map((city) => (
                                            <button
                                                key={city.value}
                                                onClick={() => handleCitySelect(city.value)}
                                                className={`w-full px-4 py-3 text-left hover:bg-gray-50/10 transition-colors
                                    ${selectedCity === city.value ? 'bg-blue-500/20' : ''}`}
                                            >
                                                {city.label}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-center h-full'>
                                        <Text variant={TextVariant.P}>Введите минимум 2 буквы для поиска</Text>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};