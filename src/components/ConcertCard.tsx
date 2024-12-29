import Text, {TextVariant} from "./Text.tsx";
import Button, {ButtonVariant} from "./Button.tsx";
import {useDate} from "../hooks/useDate.ts";
import {Link} from "react-router";
import TicketModal from "./TicketModal.tsx";
import {useState} from "react";

interface ConcertCardProps {
    index: number,
    to: string,
    title: string,
    descriptionShort: string,
    date: Date,
    location: string,
    city: string,
    poster: string,
    url?: string
}
const ConcertCard = ({index, to, title, descriptionShort, date, location, city, poster, url}: ConcertCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <div className='flex flex-col lg:flex-row lg:gap-40 justify-between'>
            {url && <TicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                ticketUrl={url}
            />}
            <img className='lg:w-1/4 shadow-white' alt={poster} src={poster}/>
            <div className='flex flex-col gap-10'>
                <div>
                    <div className={`${index % 2 === 0 ? 'text-yellow' : 'text-red'}`}>
                        <Text variant={TextVariant.H1}>{title}</Text>
                    </div>
                    <div>
                        <Text variant={TextVariant.H3}>{city}, {location}</Text>
                        <Text variant={TextVariant.H3}>{useDate(date)}</Text>
                    </div>
                </div>
                <Text variant={TextVariant.P}>{descriptionShort}</Text>
                <div className='flex lg:flex-row flex-col items-center gap-5'>
                    <div onClick={() => setIsModalOpen(true)}><Button variant={ButtonVariant.white}>Бронь билета</Button></div>
                    <Link className='self-center' to={to}><Button variant={ButtonVariant.white}>Узнать больше</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default ConcertCard;