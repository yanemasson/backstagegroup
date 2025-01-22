import {FC, useEffect, useState} from 'react';
import Button, {ButtonVariant} from "./Button.tsx";

interface TicketButtonProps {
    eventId: number;

}

const TicketButton: FC<TicketButtonProps> = ({eventId,}) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
      #radarioWidgetInner1 {
        position: fixed !important;
        top: 48% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        z-index: 9999 !important;
        background: white !important;
        border-radius: 8px !important;
        box-shadow: 0 0 10px rgba(0,0,0,0.3) !important;
        max-width: 90vw !important;
        max-height: 90vh !important;
      }

      #RadarioIframe1 {
        border-radius: 8px !important;
        max-width: 100% !important;
        max-height: 95vh !important;
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

        if (document.querySelector('script[src*="openapi.js"]')) {
            setIsScriptLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://radario.ru/frontend/src/api/openapi/openapi.js';
        script.async = true;

        script.onload = () => {
            setIsScriptLoaded(true);
        };

        document.head.appendChild(script);
    }, []);

    const handleClick = () => {
        if (!isScriptLoaded || !window.radario) {
            console.error('Radario script not loaded');
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'radario-overlay';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
            const widget = document.getElementById('radarioWidgetInner1');
            if (widget) {
                widget.remove();
            }
            overlay.remove();
            window.location.reload();
        });

        window.radario.Widgets.Event({
            params: {
                textBtnColor: "#FFFFFF"
            },
            standalone: true,
            createButton: false,
            eventId: eventId
        });
    };

    return (
        <div onClick={handleClick}>
            <Button variant={ButtonVariant.white}>
                Купить билет
            </Button>
        </div>

    );
};

export default TicketButton;
