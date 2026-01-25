declare global {
    interface Window {
        radario?: {
            Widgets: {
                Event: (config: any) => void;
                ButtonFrame?: (eventId: number) => void;
            };
        };
        ksr?: {
            summon: (options?: string | { width?: number; height?: number }) => boolean;
        };
        // Google Analytics properties
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export default Window