import { FC, ReactNode, useEffect, useCallback } from 'react';

interface TicketButtonWrapperProps {
    eventId: number;
    children: ReactNode;
    operator: "radario" | "intickets" | "kassir";
    className?: string;
}

const TicketButtonWrapper: FC<TicketButtonWrapperProps> = ({eventId, operator, children, className}) => {
    const eventIdString = eventId.toString();

    // Логика для Radario
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

    // Логика для Kassir
    const handleKassirClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (operator === 'kassir') {
            e.preventDefault();
            if (window.ksr) {
                window.ksr.summon();
            }
        }
    }, [operator]);

    useEffect(() => {
        if (operator !== 'kassir') return;

        if (!document.getElementById('kassir-script')) {
            const script = document.createElement('script');
            script.id = 'kassir-script';
            script.src = 'https://widget.kassir.ru/widget.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }, [operator]);

    const getInticketsUrl = () => {
        if (eventIdString === '62738053') {
            return `https://iframeab-pre6263.intickets.ru/seance/${eventIdString}/#abiframe`;
        }
        return `https://iframeab-pre11666.intickets.ru/seance/${eventIdString}/#abiframe`;
    };

    const getKassirUrl = () => {
        return `https://widget.kassir.ru/?type=E&key=62a61af3-48f2-c264-ea78-0d77bc476c59&domain=sakh.kassir.ru&id=${eventIdString}`;
    };

    // Определяем href и дополнительные props в зависимости от оператора
    let href = `#event/${eventIdString}`;
    let linkProps: any = {};
    let onClick: ((e: React.MouseEvent<HTMLAnchorElement>) => void) | undefined;

    switch (operator) {
        case 'intickets':
            href = getInticketsUrl();
            linkProps = {
                rel: "noopener noreferrer",
                target: "_blank"
            };
            break;
        case 'kassir':
            href = getKassirUrl();
            linkProps = {
                rel: "noopener noreferrer"
            };
            onClick = handleKassirClick;
            break;
        default: // radario
            // Используем стандартную внутреннюю ссылку
            break;
    }

    return (
        <a
            className={`w-fit ${className}`}
            href={href}
            {...linkProps}
            onClick={onClick}
        >
            {children}
        </a>
    );
};

export default TicketButtonWrapper