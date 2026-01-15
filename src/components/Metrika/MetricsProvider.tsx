import GoogleTagManager from './GoogleTagManager';
import YandexMetrika from "./YandexMetrika.tsx";
import MailRuMetrika from "./MailRuMetrika.tsx";
import {useCookieConsent} from "../../hooks/useCookieConsent.ts";

const MetricsProvider = () => {

    const { cookiePreferences } = useCookieConsent();


    return (
        <>
            {cookiePreferences?.analytics && (
                <>
                    <GoogleTagManager ga4Id={import.meta.env.VITE_GA4_ID} gtmId={import.meta.env.VITE_GTM_ID} />
                    <YandexMetrika counterId={import.meta.env.VITE_YANDEX_ID}/>
                    <MailRuMetrika counterId={import.meta.env.VITE_MAILRU_ID}/>
                </>
            )}
        </>
    );
};

export default MetricsProvider;
