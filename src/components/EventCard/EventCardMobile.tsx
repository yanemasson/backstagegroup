import {Event} from "../../types/event.ts";
import {getDate} from "../../utils/getDate.ts";
import videoPosterMobile from "../../assets/video_poster_mobile.png";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import Text, {TextVariant} from "../Text.tsx";
import TicketButtonWrapper from "../Buttons/TicketButtonWrapper.tsx";
import Button, {ButtonVariant} from "../Buttons/Button.tsx";
import {Link} from "react-router";
import InTicketButtonWrapper from "../Buttons/InTicketButtonWrapper.tsx";

interface EventCardProps {
    item: Event,
    to: string
}

const EventCardMobile = ({item, to}: EventCardProps) => {
    const datetime = getDate(item.date)

    return (
        <div className='w-[90wv] flex flex-col gap-[30px]'>

            <div className='flex flex-col gap-5'>
                <div className='flex justify-between -mb-6'>
                    <Text variant={TextVariant.CAPTION} className='text-orange'>{item.cta}</Text>
                    <Text variant={TextVariant.CAPTION} className='text-dark-text'>{item.age + '+'}</Text>
                </div>
                <div className='flex gap-5 items-end'>
                    <div className='flex items-end'>
                        <p className='font-display min-w-[50px] font-medium text-[40px] lining-nums leading-[1.5] -mb-3 '>{datetime.day}</p>
                        <Text variant={TextVariant.P}>{datetime.monthStr}</Text>
                        <Text variant={TextVariant.P} className='text-dark-text ml-3'>{datetime.weekday}</Text>
                    </div>
                    <div className='h-10 border-solid border-y-0 border-x-[1px] border-gray'/>
                    <p className='font-display proportional-nums text-[32px] leading-[1.3] '>{datetime.time}</p>
                </div>
                {!item.video || item.video?.length === 0
                    ? <img
                        className='h-full w-full object-cover'
                        alt={item.poster ? item.poster : videoPosterMobile}
                        src={item.poster ? item.poster : videoPosterMobile} />
                    : <VideoPlayer poster={item.poster} buttonType='play' key={item.video} video={item.video} className='w-full object-cover' />
                }
            </div>

            <div className='flex flex-col gap-2'>
                <Text className='leading-none whitespace-pre-line md:whitespace-normal' variant={TextVariant.H3}>
                    {item.title.toUpperCase()}
                </Text>
                <Text variant={TextVariant.P} className='text-dark-text'>{item.descriptionShort}</Text>
            </div>

            <div className='flex flex-col gap-2'>
                <Text variant={TextVariant.P}>{item.location}</Text>
                <Text variant={TextVariant.P} className='text-dark-text'>{'г. '+  item.city}</Text>
            </div>

            <div className='grid grid-cols-2 gap-2.5'>
                {item.eventId.toString().length > 7
                    ? <InTicketButtonWrapper eventId={item.eventId}>
                        <Button variant={ButtonVariant.outline} className='h-[50px] w-[43vw]'>Купить билет</Button>
                    </InTicketButtonWrapper>
                    : <TicketButtonWrapper eventId={item.eventId}>
                        <Button variant={ButtonVariant.outline} className='h-[50px] w-[43vw]'>Купить билет</Button>
                    </TicketButtonWrapper>
                }
                <Link to={`/events/${to}`}>
                    <Button variant={ButtonVariant.secondary} className='h-[50px] w-[43vw]'>Подробнее</Button>
                </Link>
            </div>
        </div>
    );
};

export default EventCardMobile;