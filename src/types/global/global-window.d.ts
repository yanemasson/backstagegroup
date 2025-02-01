declare global {
    interface Window {
        // Radario widget properties
        radario?: {
            Widgets: {
                Event: (config: any) => void;
                ButtonFrame?: (eventId: number) => void;
            };
        };
        // Google Analytics properties
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export default Window