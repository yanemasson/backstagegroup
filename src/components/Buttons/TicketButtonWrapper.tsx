import {FC, ReactNode, useEffect} from 'react';

interface TicketButtonWrapperProps {
    eventId: number;
    children: ReactNode;
    className?: string;
}

const TicketButtonWrapper: FC<TicketButtonWrapperProps> = ({eventId, children, className}) => {
    const eventIdString = eventId.toString();
    const isIntickets = eventIdString.length > 7;

    // Логика для Radario
    useEffect(() => {
        if (isIntickets) return;

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
                        eventId: eventIdString
                    });
                }
            };
            document.head.appendChild(script);
        }
    }, [eventIdString, isIntickets]);

    const getInticketsUrl = () => {
        if (eventIdString === '62738053') {
            return `https://iframeab-pre6263.intickets.ru/seance/${eventIdString}/#abiframe`;
        }
        return `https://iframeab-pre11666.intickets.ru/seance/${eventIdString}/#abiframe`;
    };

    const href = isIntickets
        ? getInticketsUrl()
        : `#event/${eventIdString}`;

    const linkProps = isIntickets
        ? { rel: "noopener noreferrer" as const }
        : {};

    return (
        <a
            className={`w-fit ${className}`}
            href={href}
            {...linkProps}
        >
            {children}
        </a>
    );
};

export default TicketButtonWrapper