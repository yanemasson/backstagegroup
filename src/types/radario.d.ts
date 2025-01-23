
declare global {
    interface Window {
        radario?: {
            Widgets: {
                Event: (config: any) => void;
            };
        };
    }
}


export {};
