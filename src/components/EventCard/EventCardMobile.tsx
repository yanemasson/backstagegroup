import {getDate} from "../../utils/getDate.ts";
import Text, {TextVariant} from "../Text.tsx";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import {Event} from "../../types/event.ts";
import Button, {ButtonVariant} from "../Buttons/Button.tsx";
import {Link} from "react-router";
import {useState} from "react";
import TicketButton from "../Buttons/TicketButton.tsx";

interface EventCardProps {
    item: Event,
    to: string
}

const EventCardMobile = ({item, to}: EventCardProps) => {
    const datetime = getDate(item.date)
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex items-start text-start flex-col justify-between min-w-80 min-h-[118px]
        border-solid border-gray border-x-0 border-t-0  border-b-1 b'>

            <div onClick={() => setIsOpen(!isOpen)} className='flex flex-col items-center justify-center py-[30px] min-h-[118px]'>
                <div className=' flex leading-none gap-5 '>
                    <div className='flex items-start justify-center'>
                        <p className='font-display min-w-[50px] font-medium text-[40px] lining-nums'>{datetime.day}</p>
                        <div className='w-[50x]'>
                            <p className='font-display font-medium text-[16px] tracking-[0.07em]'>{datetime.time}</p>
                            <p className='font-display font-medium text-[24px] tracking-[0.07em]'>{datetime.monthStr.substring(0,3)}</p>
                        </div>
                    </div>
                    <Text className='leading-none whitespace-pre-line' variant={TextVariant.H3}>{item.title.toUpperCase().split(' ').join('\n')}</Text>
                </div>
            </div>

            <div   className={`flex flex-col items-center justify-center gap-[30px] overflow-hidden origin-top
              ${isOpen ? 'pb-[30px] max-h-[1000px] opacity-100 scale-y-100' 
                : 'max-h-0 opacity-0 scale-y-0 pointer-events-none'}`}
                   style={{transition:
                           `max-height 300ms ease-in-out, opacity 100ms ease-in-out, transform 100ms ease-out`
                   }}>

                <div  className='flex flex-col items-center justify-center gap-[25px]'>
                    {item.video && <VideoPlayer className='w-80' video={item.video} />}
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col items-start justify-start text-start w-2/3'>
                            <Text className='text-light-brown' variant={TextVariant.H4}>Описание:</Text>
                            <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                        </div>
                        <div className='flex flex-col items-start justify-start text-start w-2/3'>
                            <Text className='text-light-brown' variant={TextVariant.H4}>г. {item.city}</Text>
                            <Text variant={TextVariant.P}>{item.location}</Text>
                        </div>
                    </div>
                </div>

                <div className='flex gap-2.5'>
                    <TicketButton className='w-[156px] h-11' eventId={item.eventId}/>
                    <Link to={`/events/${to}`}>
                        <Button className='w-[156px] h-11' variant={ButtonVariant.outline}>Подробнее</Button>
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default EventCardMobile;