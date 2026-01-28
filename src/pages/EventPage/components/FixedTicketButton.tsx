import TicketButtonWrapper from "../../../components/Buttons/TicketButtonWrapper.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import Button, {ButtonVariant} from "../../../components/Buttons/Button.tsx";

interface FixedTicketButtonProps {
    eventId: number;
    operator: "radario" | "intickets" | "kassir";
}

const FixedTicketButton = ({eventId, operator}: FixedTicketButtonProps) => {
    const md = useMediaBreakpoint('md')

    return (
        <div className={`flex justify-center items-center md:justify-start  md:w-[1166px]
        z-30 fixed bottom-0 left-0 md:left-auto w-screen h-20 transition-all duration-300
        ${md ? 'bg-none' : 'bg-darkgray'}`}
        >
            <div className='md:pr-5 md:py-4 md:bg-darkgray '>
                <TicketButtonWrapper operator={operator} eventId={eventId}>
                    <Button className='w-[90vw] h-[45px] md:w-[335px] md:h-[53px]' variant={ButtonVariant.primary}>Купить билет</Button>
                </TicketButtonWrapper>
            </div>
        </div>
    );
};

export default FixedTicketButton;