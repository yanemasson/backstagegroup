import {Concert} from "../../../types/event.ts";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import Text, {TextVariant} from "../../../components/Text.tsx";
import {getDate} from "../../../utils/getDate.ts";
import MoreButton from "../../../components/Buttons/MoreButton.tsx";

interface TicketButtonGroupProps {
    concerts: Concert[]
}
const TicketButtonsGroup = ({concerts}:TicketButtonGroupProps) => {

    return (
        <div className='flex flex-col w-full gap-10'>
            {concerts.map((item) =>
                <div className='flex flex-col gap-5'>
                    <div className='flex items-center gap-1 justify-between'>
                        <Text variant={TextVariant.H3}>{getDate(item.date)}</Text>
                        <div className='self-end'><TicketButton eventId={item.eventId}/></div>
                    </div>
                    <hr className='h-[1px] bg-white/60 shadow-white shadow-sm border-0' />
                </div>
            )}
            <div className='self-end'><MoreButton/></div>

        </div>
    );
};

export default TicketButtonsGroup;