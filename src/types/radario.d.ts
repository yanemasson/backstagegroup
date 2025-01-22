// types/global.d.ts
declare global {
    interface Window {
        radario: {
            Widgets: {
                Event: (config: any) => void;
                OpenPopup: (config: {
                    event: {
                        id: number;
                    };
                    modal?: boolean;
                }) => void;
            };
        };
    }
}

export {};
