import { ReactNode, useEffect, useRef } from 'react';

interface TicketButtonWrapperProps {
    eventId: number;
    orgId?: number;
    eventLink?: string;
    children: ReactNode;
    operator: "radario" | "intickets" | "kassir";
    className?: string;
}

const TicketButtonWrapper = ({ eventId, orgId = 11666, eventLink, operator, children, className }: TicketButtonWrapperProps) => {
    const eventIdString = eventId.toString();
    const linkRef = useRef<HTMLAnchorElement>(null);

    //radario
    useEffect(() => {
        if (operator !== 'radario') return;

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
    }, [eventIdString, operator]);

    //kassir
    useEffect(() => {
        if (operator === 'kassir' && linkRef.current) {
            const link = linkRef.current;

            link.onclick = function() {
                if (window.ksr && typeof window.ksr.summon === 'function') {
                    try {
                        return window.ksr.summon();
                    } catch (error) {
                        console.error('Kassir summon error:', error);
                    }
                }
                return false;
            };
        }
    }, [operator, eventIdString]);



    if (operator === 'kassir') {
        console.log(eventLink)
        return (
            <a
                ref={linkRef}
                className={`w-fit ${className} widget-tr`}
                href={eventLink}
                target="_blank"
                // Добавляем data-атрибуты для отладки
                data-kassir-event={eventIdString}
                data-kassir-operator="kassir"
            >
                {children}
            </a>
        );
    }

    //intickets
    const getInticketsUrl = () => {
        return `https://iframeab-pre${orgId}.intickets.ru/seance/${eventIdString}/#abiframe`;
    };

    let href = `#event/${eventIdString}`;
    let linkProps: any = {};

    if (operator === 'intickets') {
        href = getInticketsUrl();
        linkProps = {
            rel: "noopener noreferrer",
            target: "_blank"
        };
    }

    return (
        <a
            className={`w-fit ${className} widget-tr`}
            href={
            eventId == 801
                ? 'https://widget2.kassy.ru/auth/backstagegroup/?back=/novokuznetsk/event/7567/'
                : href}
            {...linkProps}
        >
            {children}
        </a>
    );
};

export default TicketButtonWrapper;