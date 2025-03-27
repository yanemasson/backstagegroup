import {FC, ReactNode, useEffect} from 'react';
import Button, {ButtonVariant} from "./Button.tsx";

interface TicketButtonProps {
    eventId: number;
    children?: ReactNode;
    className?: string;
}

const TicketButton: FC<TicketButtonProps> = ({eventId, className, children = <>Купить билет</>}) => {
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
        <a href={`#event/${eventId}`}><Button className={className} variant={ButtonVariant.primary}>{children}</Button></a>
    );
};

export default TicketButton
