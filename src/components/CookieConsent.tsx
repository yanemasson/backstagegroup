import Text, {TextVariant} from "./Text.tsx";
import Button, {ButtonSize, ButtonVariant} from "./Buttons/Button.tsx";
import {CookieConsentProps, CookiePreferences} from '../types/cookie';
import {useState} from "react";
import CloseIcon from '../assets/icons/ic_close.svg?react'
import Anchor from "./Anchor.tsx";

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
        <div className='bg-bg-island p-4 w-[360px] fixed bottom-0 z-50 md:right-5 md:bottom-5 shadow flex flex-col gap-3'>
            <div className='text-text-primary flex justify-between'>
                <Text variant={TextVariant.Subtitle_M}>Мы собираем cookie</Text>
                <div className='cursor-pointer' onClick={handleAcceptAll}>
                    <CloseIcon/>
                </div>
            </div>

            <Text className='text-text-tertiary' variant={TextVariant.Body_M}>
                {'Нажимая “хорошо”, Вы соглашаетесь с их '}
                <Anchor href={'/privacy_policy'}>использованием</Anchor>
                {'.'}
            </Text>

            <div className='flex gap-3'>
                <Button
                    className='flex-1'
                    size={ButtonSize.small}
                    variant={ButtonVariant.secondary}
                    onClick={handleRejectAll}
                >
                    Отказаться
                </Button>
                <Button
                    className='flex-1'
                    size={ButtonSize.small}
                    onClick={handleAcceptAll}
                    variant={ButtonVariant.primary}
                >
                    Хорошо
                </Button>
            </div>
        </div>
    );
};

export default CookieConsent;