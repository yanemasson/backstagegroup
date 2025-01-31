import GoogleTagManager from './GoogleTagManager';
import YandexMetrika from "./YandexMetrika.tsx";
import MailRuMetrika from "./MailRuMetrika.tsx";
import {ReactNode} from "react";

interface MetricsProviderProps {
    children: ReactNode
}
const MetricsProvider = ({ children }: MetricsProviderProps) => {
    return (
        <>
            <GoogleTagManager id={import.meta.env.VITE_GTM_ID} />
            <YandexMetrika counterId={import.meta.env.VITE_YANDEX_ID}/>
            <MailRuMetrika counterId={import.meta.env.VITE_MAILRU_ID}/>
            {children}
        </>
    );
};

export default MetricsProvider;
