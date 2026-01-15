import Text, {TextVariant} from "./Text.tsx";
import Button, {ButtonSize, ButtonVariant} from "./Buttons/Button.tsx";
import CloseIcon from '../assets/icons/ic_close.svg?react'
import Anchor from "./Anchor.tsx";
import {useCookieContext} from "../context/CookieContext.tsx";

const CookieConsent = () => {

    const {
        showBanner,
        acceptAll,
        rejectAll,
    } = useCookieContext();

    if (location.pathname === '/privacy_policy') return null;
    if (!showBanner) return null;

    return (
        <div className='bg-bg-island p-4 md:w-[360px] w-full fixed bottom-0 z-50 md:right-5 md:bottom-5 shadow flex flex-col gap-3'>
            <div className='text-text-primary flex justify-between'>
                <Text variant={TextVariant.Subtitle_M}>Мы собираем cookie</Text>
                <div className='cursor-pointer' onClick={() => acceptAll()}>
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
                    onClick={() => rejectAll()}
                >
                    Отказаться
                </Button>
                <Button
                    className='flex-1'
                    size={ButtonSize.small}
                    onClick={() => acceptAll()}
                    variant={ButtonVariant.primary}
                >
                    Хорошо
                </Button>
            </div>
        </div>
    );
};

export default CookieConsent;