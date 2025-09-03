import {useEffect, useState} from 'react';
import Text, {TextVariant} from "../../../components/Text.tsx";
import {useCitySearch} from "../../../hooks/geolocation/useCitySearch.ts";
import {useCity} from "../../../hooks/geolocation/useCity.ts";
import CloseIcon from '../../../assets/icons/ic_close.svg?react'
import {useNavigate} from "react-router";


interface CitySearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CitySearchModal = ({ isOpen, onClose }: CitySearchModalProps) => {
    const { setSelectedCity } = useCity();
    const { cities, isLoading, searchCities } = useCitySearch();
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        if (searchValue.length >= 2) {
            searchCities(searchValue);
        }
    }, [searchValue]);

    const handleCitySelect = (cityName: string) => {
        setSelectedCity(cityName);
        onClose();
        navigate(0)
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed md:absolute left-0 top-0 md:top-8 pr-4 pt-4 pl-[30px] bg-semi-darkgray w-screen h-screen md:w-[382px] md:h-[531px] flex flex-col z-50">
                <div onClick={onClose} className='text-[#595959] cursor-pointer self-end'>
                    <CloseIcon/>
                </div>
                <div className="shrink-0 p-4 border-b border-gray-200">
                    <Text variant={TextVariant.P}>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Введите название города"
                            className="w-full"
                        />
                    </Text>
                </div>

                <div className="flex-1 overflow-hidden">
                    <div className="h-full overflow-y-hidden">
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
                                                className={`w-full px-4 py-3 text-left transition-colors`}
                                            >
                                                <Text className='hover:text-light-brown' variant={TextVariant.CAPTION}>{city.label}</Text>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='flex items-center justify-center h-full'>
                                        <Text variant={TextVariant.CAPTION}>Введите минимум 2 буквы для поиска</Text>
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