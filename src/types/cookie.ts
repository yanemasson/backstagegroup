export interface CookiePreferences {
    necessary: boolean;     // Обязательные (всегда включены)
    analytics: boolean;     // Яндекс.Метрика, Google Analytics, MailRu Metrika
    marketing: boolean;
}

export interface CookieConsentProps {
    onAcceptAll: () => void;
    onRejectAll: () => void;
    onCustomize?: (preferences: CookiePreferences) => void;
    onClose?: () => void;
}