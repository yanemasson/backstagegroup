import Text, {TextVariant} from "../Text.tsx";
import {Event} from "../../types/event.ts"
import {getDate} from "../../utils/getDate.ts";
import Button, {ButtonVariant} from "../Buttons/Button.tsx";
import {Link} from "react-router";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import videoPosterDesktop from "../../assets/video_poster_desktop.png";
import TicketButtonWrapper from "../Buttons/TicketButtonWrapper.tsx";

interface EventCardProps {
    item: Event,
    to: string
}

const EventCardDesktop = ({item, to}: EventCardProps) => {
    const datetime = getDate(item.date)

    return (
        <div className='flex items-start text-start flex-row justify-between'>
            <div className='flex flex-col items-end text-end gap-5 mr-[52px]'>
                <div>
                    <p className='font-display min-w-[50px] font-medium text-[40px] lining-nums leading-[1.5] mb-2.5'>
                        {datetime.day}
                    </p>
                    <Text variant={TextVariant.P}>{datetime.monthStr}</Text>
                    <Text variant={TextVariant.P} className='text-dark-text'>{datetime.weekday}</Text>
                </div>
                <div className='w-full border-solid border-x-0 border-y-[1px] border-gray'/>
                <p className='font-display proportional-nums text-[32px] leading-[1.3] '>{datetime.time}</p>
                <div className='w-full border-solid border-x-0 border-y-[1px] border-gray'/>
                <div>
                    <Text variant={TextVariant.CAPTION} className='text-dark-text'>{item.age + '+'}</Text>
                    <Text variant={TextVariant.CAPTION} className='text-orange'>{item.cta}</Text>
                </div>
            </div>

            <div className='flex flex-col justify-between h-[313px] w-[438px] mr-8'>
                <div className='flex flex-col gap-[30px]'>
                    <div className='flex flex-col gap-2'>
                        <Text variant={TextVariant.H3}>{item.title.toUpperCase()}</Text>
                        <Text variant={TextVariant.P} className='text-dark-text'>{item.descriptionShort}</Text>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Text variant={TextVariant.P}>{item.location}</Text>
                        <Text variant={TextVariant.P} className='text-dark-text'>{'г. ' + item.city}</Text>
                    </div>
                </div>

                <div className='flex gap-2.5 justify-self-end'>
                    <TicketButtonWrapper eventId={item.eventId}>
                        <Button variant={ButtonVariant.outline} className='h-[50px] w-[214px]'>Купить билет</Button>
                    </TicketButtonWrapper>
                    <Link to={`/events/${to}`}>
                        <Button variant={ButtonVariant.secondary} className='h-[50px] w-[214px]'>Подробнее</Button>
                    </Link>
                </div>
            </div>

            <div className="min-w-[556px] w-[556px] h-[313px]">
                {!item.video || item.video?.length === 0
                    ? <img
                        className='h-full w-full object-cover'
                        alt={item.poster ? item.poster : videoPosterDesktop}
                        src={item.poster ? item.poster : videoPosterDesktop}
                    />
                    : <VideoPlayer buttonType='play' key={item.video} video={item.video} className='w-full object-cover' />}
            </div>

        </div>
    );
};

export default EventCardDesktop;