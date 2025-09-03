import Text, {TextVariant} from "./Text.tsx";
import {Link} from "react-router";
import Button, {ButtonVariant} from "./Buttons/Button.tsx";
import {CookieConsentProps, CookiePreferences} from '../types/cookie';
import {useState} from "react";
import Checkbox from "./Checkbox.tsx";
import CloseIcon from '../assets/icons/ic_close.svg?react'

const CookieConsent = (
    {onAcceptAll, onRejectAll, onCustomize, onClose}: CookieConsentProps) => {

    const [showCustomize, setShowCustomize] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    const handleCustomizeToggle = () => {
        setShowCustomize(!showCustomize);
    };

    const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
        if (key === 'necessary') return;

        setPreferences(prev => ({
            ...prev,
            [key]: value
        }));

    };

    const handleSaveCustom = () => {
        if (onCustomize) {
            onCustomize(preferences);
        }
        onClose?.();
    };

    const handleAcceptAll = () => {
        onAcceptAll();
        onClose?.();
    };

    const handleRejectAll = () => {
        onRejectAll();
        onClose?.();
    };

    return (
        <div className='text-white w-screen p-5 md:w-[741px] md:p-[30px] bg-dark-bg fixed bottom-0 z-30 md:right-5 md:bottom-5 shadow'>
            {showCustomize
                ? <>
                    <div className='flex items-center pb-5 gap-3 cursor-pointer '>
                        <div className='h-8 w-8 text-[#6E6E6D] hover:text-light-brown'>
                            <svg onClick={handleCustomizeToggle} className='rotate-90 w-4 h-3 my-3 mx-2 '
                                 viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L0 0H12L6 9Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className='flex w-full justify-between'>
                            <Text variant={TextVariant.H4}>Настройки</Text>
                            <div className='text-[#595959] cursor-pointer' onClick={handleAcceptAll}>
                                <CloseIcon/>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <Checkbox checked={preferences.necessary}
                                  onChange={() => {}}
                                  disabled={true}
                        >
                            <div>
                                <Text className='mb-2 mt-2' variant={TextVariant.B}>Необходимые куки</Text>
                                <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                                    Для базовой функциональности сайта (сессии, безопасность)
                                </Text>
                            </div>
                        </Checkbox>
                        <Checkbox
                            checked={preferences.analytics}
                            onChange={(checked) => handlePreferenceChange('analytics', checked)}
                        >
                            <div>
                                <Text className='mb-2 mt-2' variant={TextVariant.B}>Аналитические куки</Text>
                                <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                                    Для сбора статистики (например, Google Analytics)
                                </Text>
                            </div>
                        </Checkbox>
                        <Checkbox
                            checked={preferences.marketing}
                            onChange={(checked) => handlePreferenceChange('marketing', checked)}
                        >
                            <div>
                                <Text className='mb-2 mt-2' variant={TextVariant.B}>Маркетинговые куки</Text>
                                <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                                    Для персонализированной рекламы.
                                </Text>
                            </div>
                        </Checkbox>
                    </div>

                    <Button
                        className='h-11 w-full mt-5 md:w-[125px]'
                        variant={ButtonVariant.primary}
                        onClick={handleSaveCustom}
                    >
                        Сохранить
                    </Button>
                </>

                : <>
                    <div className='flex w-full justify-between'>
                        <Text className='pb-5' variant={TextVariant.H4}>Мы используем файлы cookie</Text>
                        <div className='text-[#595959] cursor-pointer' onClick={handleAcceptAll}>
                            <CloseIcon/>
                        </div>
                    </div>
                    <Text className='pb-6' variant={TextVariant.CAPTION}>
                        Мы используем файлы cookie и аналогичные технологии для обеспечения работы сайта, анализа посещаемости, персонализации контента и рекламы. Это помогает улучшить ваш опыт использования сайта backstagegroup.ru. Подробности в нашей <Link className='text-light-brown focus:text-white hover:text-white' target='_blank' to='/privacy_policy'>Политике конфиденциальности</Link>
                    </Text>


                    <div className='flex flex-col md:flex-row-reverse md:justify-end gap-2.5'>
                        <div className='grid grid-cols-2 md:grid-cols-none md:flex gap-2.5'>
                            <Button
                                className='h-11 md:w-[140px]'
                                variant={ButtonVariant.secondary}
                                onClick={handleRejectAll}
                            >
                                Отказаться
                            </Button>
                            <Button
                                onClick={handleCustomizeToggle}
                                className='h-11 md:w-[140px]'
                                variant={ButtonVariant.secondary}
                            >
                                Настроить
                            </Button>
                        </div>
                        <Button
                            onClick={handleAcceptAll}
                            className='w-full h-11 md:w-[140px]'
                            variant={ButtonVariant.primary}
                        >
                            Принять все
                        </Button>
                    </div>
                </>
            }
        </div>
    );
};

export default CookieConsent;