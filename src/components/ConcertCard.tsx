import Text, {TextVariant} from "./Text.tsx";
import Button, {ButtonVariant} from "./Button.tsx";
import {useDate} from "../hooks/useDate.ts";
import {Link} from "react-router-dom";
import {useMediaBreakpoint} from "../hooks/useMediaBreakpoint.ts";
import TicketButton from "./TicketButton.tsx";
import {useState} from "react";
import DownArrow from "./DownArrow.tsx";
import UpArrow from "./UpArrow.tsx";
import VideoPlayer from "./VideoPlayer.tsx";
import {Concert} from "../types/concert.ts";

interface ConcertCardProps {
    item: Concert,
    index: number,
    to: string
}
const ConcertCard = ({item, index, to}: ConcertCardProps) => {
    const lg = useMediaBreakpoint('lg')
    const dateString = useDate(item.date)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>{lg
            ? <div className='flex items-center text-start flex-row gap-5 xl:gap-40 md:gap-20 justify-between'>
                <img className='xl:w-1/4 xl:h-1/4 md:w-1/2 md:h-1/2 shadow-white' alt={item.poster} src={item.poster}/>
                <div className='flex flex-col gap-10'>
                    <div>
                        <div className={`${index % 2 === 0 ? 'text-yellow' : 'text-red'}`}>
                            <Text variant={TextVariant.H2}>{item.title}</Text>
                        </div>
                        <div>
                            <Text variant={TextVariant.H3}>{dateString}</Text>
                            <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                        </div>
                    </div>
                    <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                    <div className='flex lg:flex-row flex-col items-center gap-5'>
                        {item.eventId != 0
                            ? <TicketButton eventId={item.eventId}/>
                            : <Button variant={ButtonVariant.outline}>Пока недоступно</Button>
                        }
                        <Link className='self-center' to={`/events/${to}`}><Button variant={ButtonVariant.white}>Узнать больше</Button></Link>
                    </div>
                </div>
            </div>
            : <div className={`border-white border-solid rounded-2xl p-4 transition-all flex flex-col items-start text-start gap-1 justify-between`}>
                <div className={`flex flex-row ${index % 2 === 0 ? 'text-yellow' : 'text-red'}`}>
                    <Text variant={TextVariant.H2}>{item.title}</Text>
                </div>
                <Text variant={TextVariant.H3}>{dateString}</Text>
                <div className={`flex flex-col gap-5 transition-all duration-300 ease-out overflow-hidden ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                    {(item.videos && item.videos.length > 0)
                        ? <VideoPlayer videos={item.videos}/>
                        : <img className='xl:w-1/4 xl:h-1/4 md:w-1/2 md:h-1/2 shadow-white' alt={item.poster} src={item.poster}/>
                    }
                    <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                    <div className='flex lg:flex-row flex-col items-center gap-5'>
                        {item.eventId != 0
                            ? <TicketButton eventId={item.eventId}/>
                            : <Button variant={ButtonVariant.outline}>Пока недоступно</Button>
                        }
                        <Link className='self-center' to={`/events/${to}`}>
                            <Button variant={ButtonVariant.white}>Узнать больше</Button>
                        </Link>
                    </div>
                </div>
                <div onClick={() => setIsOpen(!isOpen)} className='absolute left-[85%] '>
                    {isOpen ? <UpArrow index={index}/> : <DownArrow index={index}/>}
                </div>
            </div>
        }</>
    );
};

export default ConcertCard;