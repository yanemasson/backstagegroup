export interface LocationState {
    city: string | null;
    error: string | null;
    loading: boolean;
}

export interface DaDataResponse {
    location: {
        value: string;
        city: string;
        region: string;
    };
}

export interface CityContextType {
    city: string | null;
    selectedCity: string | null;
    loading: boolean;
    error: string | null;
    setSelectedCity: (city: string | null) => void;
    handleCityChange: (cityName: string) => Promise<void>;
}