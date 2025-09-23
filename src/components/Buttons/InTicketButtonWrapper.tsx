import {ReactNode} from 'react';

interface TicketButtonWrapperProps {
    eventId: string | number;
    children: ReactNode;
}

const TicketButtonWrapper = ({ eventId, children }: TicketButtonWrapperProps) => {
    const widgetUrl = `https://iframeab-pre11666.intickets.ru/seance/${eventId}/#abiframe`;

    return (
        <a
            className='w-fit'
            href={widgetUrl}
            rel="noopener noreferrer"
        >
            {children}
        </a>
    );
};

export default TicketButtonWrapper;