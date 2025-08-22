import GoogleTagManager from './GoogleTagManager';
import YandexMetrika from "./YandexMetrika.tsx";
import MailRuMetrika from "./MailRuMetrika.tsx";
import {ReactNode} from "react";
import {useCookieConsent} from "../../hooks/useCookieConsent.ts";
import CookieConsent from "../CookieConsent.tsx";
import {CookiePreferences} from "../../types/cookie.ts";

interface MetricsProviderProps {
    children: ReactNode
}
const MetricsProvider = ({ children }: MetricsProviderProps) => {

    const { showBanner, acceptAll, rejectAll, customize, cookiePreferences } = useCookieConsent();
    const handleClose = () => {
        if (!cookiePreferences) {
            const defaultPreferences: CookiePreferences = {
                necessary: true,
                analytics: true,
                marketing: true
            };
            customize(defaultPreferences);
        }
    };

    return (
        <>
            {cookiePreferences?.analytics && (
                <>
                    <GoogleTagManager ga4Id={import.meta.env.VITE_GA4_ID} gtmId={import.meta.env.VITE_GTM_ID} />
                    <YandexMetrika counterId={import.meta.env.VITE_YANDEX_ID}/>
                    <MailRuMetrika counterId={import.meta.env.VITE_MAILRU_ID}/>
                </>
            )}

            {showBanner &&
                <CookieConsent onAcceptAll={acceptAll}
                               onRejectAll={rejectAll}
                               onCustomize={customize}
                               onClose={handleClose}
                />
            }
            {children}
        </>
    );
};

export default MetricsProvider;
