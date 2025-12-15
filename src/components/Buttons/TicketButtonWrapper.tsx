import { ReactNode, useEffect, useRef } from 'react';

interface TicketButtonWrapperProps {
    eventId: number;
    children: ReactNode;
    operator: "radario" | "intickets" | "kassir";
    className?: string;
}

const TicketButtonWrapper = ({ eventId, operator, children, className }: TicketButtonWrapperProps) => {
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

    const getKassirUrl = () => {
        return `https://widget.kassir.ru/?type=E&key=62a61af3-48f2-c264-ea78-0d77bc476c59&domain=sakh.kassir.ru&id=${eventIdString}`;
    };

    if (operator === 'kassir') {
        const kassirUrl = getKassirUrl();
        return (
            <a
                ref={linkRef}
                className={`w-fit ${className} widget-tr`}
                href={kassirUrl}
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
        if (eventIdString === '62738053') {
            return `https://iframeab-pre6263.intickets.ru/seance/${eventIdString}/#abiframe`;
        }
        return `https://iframeab-pre11666.intickets.ru/seance/${eventIdString}/#abiframe`;
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
            href={href}
            {...linkProps}
        >
            {children}
        </a>
    );
};

export default TicketButtonWrapper;