import Text, {TextVariant} from "../../../components/Text.tsx";
import {useCity} from "../../../hooks/geolocation/useCity.ts";
import CloseIcon from '../../../assets/icons/ic_close.svg?react'
import {useNavigate} from "react-router";
import {useDrupalCities} from "../../../hooks/geolocation/useDrupalCities.ts";
import LoadingSpinner from "../../../components/LoadingSpinner.tsx";


interface CitySearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CitySearchModal = ({ isOpen, onClose }: CitySearchModalProps) => {
    const { setSelectedCity } = useCity();
    const { cities, isLoading, error } = useDrupalCities();
    const navigate = useNavigate();

    const handleCitySelect = (cityName: string) => {
        setSelectedCity(cityName);
        onClose();
        navigate(0);
    };

    const borderStyle = 'border-solid border-x-0 border-t-0 border-b-[1px] border-divider-default';
    const style = `p-4 h-[52px] hover:text-button-primary-active ${borderStyle}`;

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-bg-overlay z-40"
                onClick={onClose}
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div
                    className="w-[90vw] xl:max-w-[560px] bg-bg-island max-h-[80vh] flex flex-col overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Заголовок модального окна */}
                    <div className={`${borderStyle} p-3 h-12 flex items-center justify-between shrink-0`}>
                        <Text variant={TextVariant.Subtitle_M}>
                            Выберите ваш город
                        </Text>
                        <div
                            onClick={onClose}
                            className='cursor-pointer p-1 hover:bg-gray-100 rounded'
                        >
                            <CloseIcon/>
                        </div>
                    </div>

                    {/* Контент с возможностью прокрутки */}
                    <div className="overflow-y-auto flex-1">
                        {error && (
                            <div className="p-4">
                                <Text variant={TextVariant.Checkbox_L}>{error}</Text>
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex items-center justify-center p-8">
                                <LoadingSpinner/>
                            </div>
                        ) : (
                            <>
                                {cities.map((city) => (
                                    <div
                                        key={city}
                                        onClick={() => handleCitySelect(city)}
                                        className={`${style} cursor-pointer hover:bg-gray-50 transition-colors`}
                                    >
                                        <Text variant={TextVariant.Checkbox_L}>{city}</Text>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CitySearchModal;