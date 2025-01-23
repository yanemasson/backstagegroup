declare global {
    interface Window {
        radario?: {
            Widgets: {
                Event: (config: any) => void;
                ButtonFrame?: (eventId: number) => void;
            };
        };
    }
}