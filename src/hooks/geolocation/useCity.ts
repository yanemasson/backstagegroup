import { useContext } from 'react';
import {CityContext} from "../../context/CityContext.tsx";


export const useCity = () => {
    const context = useContext(CityContext);
    if (context === undefined) {
        throw new Error('useCity must be used within a CityProvider');
    }
    return context;
};