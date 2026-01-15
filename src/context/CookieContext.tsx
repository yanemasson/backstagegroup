import React, { createContext, useContext, ReactNode } from 'react';
import { useCookieConsent } from '../hooks/useCookieConsent';

type CookieContextType = ReturnType<typeof useCookieConsent>;

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const useCookieContext = () => {
    const context = useContext(CookieContext);
    if (!context) throw new Error('useCookieContext must be used within CookieProvider');
    return context;
};

export const CookieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const cookieConsent = useCookieConsent();
    return (
        <CookieContext.Provider value={cookieConsent}>
            {children}
        </CookieContext.Provider>
    );
};