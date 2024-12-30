import Text, {TextVariant} from "../../../components/Text.tsx";
import Button, {ButtonVariant} from "../../../components/Button.tsx";
import {Concert} from "../../../types/concert.ts";
import {useDate} from "../../../hooks/useDate.ts";
import {useState} from "react";
import TicketModal from "../../../components/TicketModal.tsx";

interface InformationProps {
    item: Concert
}

const Information = (({item}:InformationProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='flex flex-col bg-black text-white px-5 lg:px-40 gap-20'>
            {item.url && <TicketModal isOpen={isOpen} onClose={() => setIsOpen(false)} ticketUrl={item.url}/>}
            <div className='flex flex-col lg:flex-row pt-20 lg:gap-40 justify-between '>
                <img className='xl:w-1/4 xl:h-1/4 md:w-1/2 md:h-1/2 shadow-white' alt={item.poster} src={item.poster}/>
                <div className='flex flex-col gap-10'>
                    <div>
                        <Text variant={TextVariant.H1}>{item.title}</Text>
                        <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                        <Text variant={TextVariant.H3}>{useDate(item.date)}</Text>
                    </div>
                    <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                    <div className='lg:self-start self-center' onClick={() => setIsOpen(true)}><Button variant={ButtonVariant.white}>Купить билет</Button></div>
                </div>
            </div>
            <div>
                <Text variant={TextVariant.B}>О концерте:</Text>
                <Text variant={TextVariant.P}>{item.descriptionFull}</Text>
            </div>
        </div>

    );
})
export default Information;