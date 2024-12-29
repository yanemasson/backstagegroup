import Text, {TextVariant} from "../../../components/Text.tsx";
import Button, {ButtonVariant} from "../../../components/Button.tsx";
import {Concert} from "../../../types/concert.ts";
import {useDate} from "../../../hooks/useDate.ts";
import {useEffect, useState} from "react";
import TicketModal from "../../../components/TicketModal.tsx";

interface InformationProps {
    item: Concert
}

const Information = (({item}:InformationProps) => {
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        console.log(item)
    }, [item]);
    return (
        <>
            {item.url && <TicketModal isOpen={isOpen} onClose={() => setIsOpen(false)} ticketUrl={item.url}/>}
            <div className='flex flex-col lg:flex-row pt-20 lg:gap-40 px-5 lg:px-40 justify-between bg-black text-white'>
                <img className='lg:w-1/4 shadow-white' alt={item.poster} src={item.poster}/>
                <div className='flex flex-col gap-10'>
                    <div>
                        <Text variant={TextVariant.H1}>{item.title}</Text>
                        <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                        <Text variant={TextVariant.H3}>{useDate(item.date)}</Text>
                    </div>
                    <Text variant={TextVariant.P}>{item.descriptionFull}</Text>
                    <div className='lg:self-start self-center' onClick={() => setIsOpen(true)}><Button variant={ButtonVariant.white}>Бронь билета</Button></div>
                </div>
            </div>
        </>

    );
})
export default Information;