import {FC, useEffect} from 'react';
import Button, {ButtonVariant} from "./Button.tsx";

interface TicketButtonProps {
    eventId: number;
    buttonText?: string;
}

const TicketButton: FC<TicketButtonProps> = ({eventId, buttonText = 'Купить билет'}) => {
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
        <a href={`#event/${eventId}`}><Button variant={ButtonVariant.white}>{buttonText}</Button></a>
    );
};

export default TicketButton
