import {FC, ReactNode, useEffect} from 'react';

interface TicketButtonWrapperProps {
    eventId: number;
    children: ReactNode;
    className?: string;
    variant?: string;
}

const TicketButtonWrapper: FC<TicketButtonWrapperProps> = ({eventId, children}) => {

    useEffect(() => {
        if (!document.getElementById('radario-script')) {
            const script = document.createElement('script');
            script.id = 'radario-script';
            script.src = 'https://radario.ru/frontend/src/api/openapi/openapi.js';
            script.async = true;

            script.onload = () => {
                if (window.radario) {
                    window.radario.Widgets.Event({
                        params: {
                            textBtnColor: '#FFFFFF'
                        },
                        standalone: false,
                        createButton: false,
                        eventId
                    });
                }
            };
            document.head.appendChild(script);
        }
    }, [eventId]);


    return (
        <a href={`#event/${eventId}`}>{children}</a>
    );
};

export default TicketButtonWrapper