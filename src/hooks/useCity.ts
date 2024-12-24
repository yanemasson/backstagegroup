import { useContext } from 'react';
import { CityContext } from '../contexts/CityContext';

export const useCity = () => {
    const context = useContext(CityContext);
    if (context === undefined) {
        throw new Error('useCity must be used within a CityProvider');
    }
    return context;
};