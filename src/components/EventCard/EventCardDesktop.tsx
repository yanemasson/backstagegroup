import Text, {TextVariant} from "../Text.tsx";
import {Event} from "../../types/event.ts"
import {getDate} from "../../utils/getDate.ts";
import Button, {ButtonSize, ButtonVariant} from "../Buttons/Button.tsx";
import {Link} from "react-router";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import videoPosterDesktop from "../../assets/video_poster_desktop.png";
import TicketButtonWrapper from "../Buttons/TicketButtonWrapper.tsx";

interface EventCardProps {
    item: Event,
    to: string,
    isLast: boolean,
}

const EventCardDesktop = ({item, to, isLast}: EventCardProps) => {
    const datetime = getDate(item.date)

    return (
        <div
            className={`flex flex-row justify-between gap-11 py-[52px]
            ${isLast ? 'border-solid border-b-[2px] border-x-0 border-t-0 border-divider-default' : ''}`}
        >
            <div className='flex flex-col items-end gap-6 w-[88px]'>
                <div className='flex flex-col items-end gap-2'>
                    <Text variant={TextVariant.Number_L}>{datetime.day}</Text>
                    <Text variant={TextVariant.Body_M} className='text-text-tertiary'>{datetime.monthStr}</Text>
                </div>
                <div className='flex flex-col items-end gap-2'>
                    <Text variant={TextVariant.Number_XS}>{datetime.time}</Text>
                    <Text variant={TextVariant.Body_M} className='text-text-tertiary'>{datetime.weekday}</Text>
                </div>
                <Text variant={TextVariant.Overline}>{item.age + '+'}</Text>
            </div>

            <div className='flex flex-col justify-between w-[432px]'>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-1'>
                        <h3><Text variant={TextVariant.H3}>{item.title.toUpperCase()}</Text></h3>
                        <Text variant={TextVariant.Body_M} className='text-text-tertiary'>{item.descriptionShort}</Text>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Text variant={TextVariant.Body_L}>{item.location}</Text>
                        <Text variant={TextVariant.Body_M} className='text-text-tertiary'>{'г. ' + item.city}</Text>
                    </div>
                </div>
                <div className='flex gap-2 justify-between w-full '>
                    <TicketButtonWrapper eventId={item.eventId} className='flex-1'>
                        <Button
                            className='w-full'
                            variant={ButtonVariant.secondary}
                            size={ButtonSize.small}
                        >
                            Купить билет
                        </Button>
                    </TicketButtonWrapper>
                    <Link to={`/events/${to}`} className='flex-1'>
                        <Button
                            className='w-full'
                            variant={ButtonVariant.tertiary}
                            size={ButtonSize.small}
                        >
                            Подробнее
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="w-[556px] h-[306px]">
                {!item.video || item.video?.length === 0
                    ? <img
                        className='h-full w-full object-cover'
                        alt={item.poster ? item.poster : videoPosterDesktop}
                        src={item.poster ? item.poster : videoPosterDesktop}
                    />
                    : <VideoPlayer
                        poster={item.poster}
                        buttonType='play'
                        key={item.video}
                        video={item.video}
                        className='w-full object-cover'
                    />}
            </div>
        </div>
    );
};

export default EventCardDesktop;