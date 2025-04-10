import {getDate} from "../../utils/getDate.ts";
import Text, {TextVariant} from "../Text.tsx";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import {Event} from "../../types/event.ts";
import Button, {ButtonVariant} from "../Buttons/Button.tsx";
import {Link} from "react-router";
import {useState} from "react";
import TicketButton from "../Buttons/TicketButton.tsx";
import videoPosterMobile from "../../assets/video_poster_mobile.png";


interface EventCardProps {
    item: Event,
    to: string
}

const EventCardMobile = ({item, to}: EventCardProps) => {
    const datetime = getDate(item.date)
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex items-start text-start flex-col justify-between min-w-80 min-h-[118px]
        border-solid border-gray border-x-0 border-t-0  border-b-1 relative' >

            <div className='flex flex-col items-center justify-center py-[30px] min-h-[118px]' onClick={() => setIsOpen(!isOpen)}>
                <div className=' flex leading-none gap-5 '>
                    <div className='flex items-start justify-center'>
                        <p className='font-display min-w-[50px] font-medium text-[40px] lining-nums'>{datetime.day}</p>
                        <div className='w-[50x]'>
                            <p className='font-display font-medium text-[16px] tracking-[0.07em]'>{datetime.time}</p>
                            <p className='font-display font-medium text-[24px] tracking-[0.07em]'>{datetime.monthStr.substring(0,3)}</p>
                        </div>
                    </div>
                    <Text className='leading-none whitespace-pre-line md:whitespace-normal' variant={TextVariant.H3}>
                        {item.title.toUpperCase().split(' ').join('\n')}
                    </Text>
                    <svg className={`text-light-brown absolute top-10 right-0 transition-all duration-50 ${isOpen ? 'rotate-180' : ''}`}
                         width="24" height="18"
                         viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L0 0H12L6 9Z" fill="currentColor" />
                    </svg>
                </div>
            </div>

            <div   className={`flex flex-col items-center justify-center gap-[30px] overflow-hidden origin-top
              ${isOpen ? 'pb-[30px] max-h-[1000px] opacity-100 scale-y-100' 
                : 'max-h-0 opacity-0 scale-y-0 pointer-events-none'}`}
                   style={{transition:
                           `max-height 300ms ease-in-out, opacity 100ms ease-in-out, transform 100ms ease-out`
                   }}>

                <div  className='flex flex-col md:flex-row-reverse items-center justify-center w-[90vw] md:justify-between md:gap-0 gap-[25px]'>
                    {!item.video || item.video?.length === 0
                        ? <img className='h-full w-full object-cover' alt={''} src={videoPosterMobile} />
                        : <VideoPlayer buttonType='mute' key={item.video} video={item.video} className='w-full object-cover' />}
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col items-start justify-start text-start md:w-[44vw] w-2/3'>
                            <Text className='text-light-brown' variant={TextVariant.H4}>Описание:</Text>
                            <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                        </div>
                        <div className='flex flex-col items-start justify-start text-start md:w-[44vw] w-2/3'>
                            <Text className='text-light-brown' variant={TextVariant.H4}>г. {item.city}</Text>
                            <Text variant={TextVariant.P}>{item.location}</Text>
                        </div>
                    </div>
                </div>

                <div className='flex w-full justify-between'>
                    <TicketButton className='w-[44vw] h-11' eventId={item.eventId}/>
                    <Link to={`/events/${to}`}>
                        <Button className='w-[44vw] h-11' variant={ButtonVariant.outline}>Подробнее</Button>
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default EventCardMobile;