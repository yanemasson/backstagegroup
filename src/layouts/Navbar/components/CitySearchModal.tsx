import Text, {TextVariant} from "../../../components/Text.tsx";
import {useCity} from "../../../hooks/geolocation/useCity.ts";
import CloseIcon from '../../../assets/icons/ic_close.svg?react'
import {useNavigate} from "react-router";
import {useDrupalCities} from "../../../hooks/geolocation/useDrupalCities.ts";


interface CitySearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CitySearchModal = ({ isOpen, onClose }: CitySearchModalProps) => {
    const { setSelectedCity } = useCity();
    const { cities, isLoading, error } = useDrupalCities();
    const navigate = useNavigate();

    const handleCitySelect = (cityName: string) => {
        setSelectedCity(cityName);
        onClose();
        navigate(0)
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed md:absolute left-0 top-0 md:top-8 pr-4 py-4 pl-[30px] bg-semi-darkgray w-screen h-screen md:w-[382px] md:h-auto flex flex-col z-50">
                <div onClick={onClose} className='text-[#595959] cursor-pointer self-end hover:text-light-brown transition-colors duration-100'>
                    <CloseIcon/>
                </div>
                <div className="shrink-0 pl-4 pb-4">
                    <Text variant={TextVariant.P}>
                        Выберите город
                    </Text>
                </div>

                <div className="flex-1 overflow-hidden">
                    <div className="h-full overflow-y-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"/>
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-full">
                                <Text variant={TextVariant.CAPTION} className="text-red-400">
                                    {error}
                                </Text>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {cities.length > 0 ? (
                                    cities.map((city) => (
                                        <button
                                            key={city}
                                            onClick={() => handleCitySelect(city)}
                                            className="w-full px-4 py-3 text-left transition-colors hover:bg-gray-100 hover:bg-opacity-10"
                                        >
                                            <Text className='hover:text-light-brown' variant={TextVariant.CAPTION}>
                                                {city}
                                            </Text>
                                        </button>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <Text variant={TextVariant.CAPTION}>
                                            Нет доступных городов
                                        </Text>
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