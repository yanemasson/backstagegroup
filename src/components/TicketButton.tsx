import {FC, useEffect, useState} from 'react';
import Button, {ButtonVariant} from "./Button.tsx";

interface TicketButtonProps {
    eventId: number;

}

const TicketButton: FC<TicketButtonProps> = ({eventId,}) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    const handleClick = () => {
        if (!isScriptLoaded || !window.radario) {
            console.error('Radario script not loaded');
            return;
        }

        // Создаем оверлей
        const overlay = document.createElement('div');
        overlay.className = 'radario-overlay';
        document.body.appendChild(overlay);

        // Добавляем обработчик клика на оверлей
        overlay.addEventListener('click', () => {
            const widget = document.getElementById('radarioWidgetInner1');
            if (widget) {
                widget.remove();
            }
            overlay.remove();
            window.location.reload();
        });

        let container = document.getElementById('radarioContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'radarioContainer';
            document.body.appendChild(container);
        }

        // Добавляем логирование
        console.log('Creating Radario widget with eventId:', eventId);

        try {
            window.radario.Widgets.Event({
                params: {
                    textBtnColor: "#FFFFFF",
                    containerId: 'radarioContainer' // Указываем контейнер
                },
                standalone: true,
                createButton: false,
                eventId: eventId,
                onLoad: () => {
                    console.log('Widget loaded successfully');
                },
                onError: (error: any) => {
                    console.error('Widget loading error:', error);
                }
            });
        } catch (error) {
            console.error('Error creating widget:', error);
        }
    };

    useEffect(() => {
        // Добавляем стили для виджета и контейнера
        const style = document.createElement('style');
        style.textContent = `
    #radarioContainer {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      z-index: 9999 !important;
    }

    #radarioWidgetInner1 {
      background: white !important;
      border-radius: 8px !important;
      box-shadow: 0 0 10px rgba(0,0,0,0.3) !important;
      max-width: 90vw !important;
      max-height: 90vh !important;
    }

    #RadarioIframe1 {
      border-radius: 8px !important;
      max-width: 100% !important;
      max-height: 90vh !important;
    }

    .radario-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: rgba(0,0,0,0.5) !important;
      z-index: 9998 !important;
    }
  `;
        document.head.appendChild(style);

        // Загружаем скрипт с дополнительными параметрами
        if (!document.querySelector('script[src*="openapi.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://radario.ru/frontend/src/api/openapi/openapi.js';
            script.async = true;
            script.crossOrigin = "anonymous"; // Добавляем CORS

            script.onload = () => {
                console.log('Radario script loaded');
                setIsScriptLoaded(true);
            };

            script.onerror = (error) => {
                console.error('Error loading Radario script:', error);
            };

            document.head.appendChild(script);
        } else {
            setIsScriptLoaded(true);
        }
    }, []);

    return (
        <div onClick={handleClick}>
            <Button variant={ButtonVariant.white}>
                Купить билет
            </Button>
        </div>

    );
};

export default TicketButton;
