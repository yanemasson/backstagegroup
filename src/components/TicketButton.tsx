import {FC, useEffect} from 'react';

interface TicketButtonProps {
    eventId: number;
    textBtnColor?: string;
    standalone?: boolean;
    createButton?: boolean;
}

const TicketButton: FC<TicketButtonProps> = ({eventId,
                                                 textBtnColor = '#FFFFFF',
                                                 standalone = false,
                                                 createButton = true,}) => {
        useEffect(() => {
            // Добавляем скрипт Radario если его еще нет
            const loadRadarioScript = () => {
                if (!document.getElementById('radario-script')) {
                    const script = document.createElement('script');
                    script.id = 'radario-script';
                    script.src = 'https://radario.ru/frontend/src/api/openapi/openapi.js'; // Замените на актуальный URL скрипта
                    script.async = true;
                    script.onload = initializeWidget;
                    document.body.appendChild(script);
                } else {
                    initializeWidget();
                }
            };
            // Инициализируем виджет
            const initializeWidget = () => {
                if (window.radario) {
                    window.radario.Widgets.Event({
                        params: {
                            textBtnColor,
                        },
                        standalone,
                        createButton,
                        eventId,
                    });
                }
            };

            loadRadarioScript();

            // Очистка при размонтировании
            return () => {
                const script = document.getElementById('radario-script');
                if (script) {
                    script.remove();
                }
            };
        }, [eventId, textBtnColor, standalone, createButton]);

        return <div id={`radario-widget-${eventId}`}/>
};

export default TicketButton;
