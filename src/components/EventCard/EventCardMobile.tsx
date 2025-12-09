import {Event} from "../../types/event.ts";
import {getDate} from "../../utils/getDate.ts";
import videoPosterMobile from "../../assets/video_poster_mobile.png";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import Text, {TextVariant} from "../Text.tsx";
import Button, {ButtonSize, ButtonVariant} from "../Buttons/Button.tsx";
import TicketButtonWrapper from "../Buttons/TicketButtonWrapper.tsx";
import {Link} from "react-router";

interface EventCardProps {
    item: Event,
    to: string,
    isLast: boolean,
}

const EventCardMobile = ({item, to, isLast}: EventCardProps) => {
    const datetime = getDate(item.date)

    return (
        <div
            className={`flex flex-col gap-6 pt-8 pb-11
            ${isLast ? 'border-solid border-b-[2px] border-x-0 border-t-0 border-divider-default' : ''}`}
        >
            <div className='flex flex-col gap-3'>
                <div className='flex justify-between items-end'>
                    <div className='flex items-end gap-2'>
                        <Text variant={TextVariant.Number_L}>{datetime.day}</Text>
                        <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{datetime.monthStr}</Text>
                    </div>
                    <div className='flex items-end gap-2'>
                        <Text className='-translate-y-1' variant={TextVariant.Number_XS}>{datetime.time}</Text>
                        <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{datetime.weekday}</Text>
                    </div>
                    <Text className='-translate-y-1' variant={TextVariant.Overline}>{item.age + '+'}</Text>
                </div>
                {!item.video || item.video?.length === 0
                        ? <img
                            className='h-full w-full object-cover'
                            alt={item.poster ? item.poster : videoPosterMobile}
                            src={item.poster ? item.poster : videoPosterMobile} />
                        : <VideoPlayer
                            poster={item.poster}
                            buttonType='play'
                            key={item.video}
                            video={item.video}
                            className='w-full object-cover'
                        />
                }
            </div>

            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <Text variant={TextVariant.H3}>{item.title.toUpperCase()}</Text>
                    <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{item.descriptionShort}</Text>
                </div>
                <div>
                    <Text variant={TextVariant.Body_L}>{item.location}</Text>
                    <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{'г. '+  item.city}</Text>
                </div>
            </div>

            <div className='flex gap-2'>
                <TicketButtonWrapper eventId={item.eventId} className='flex-1'>
                    <Button
                        variant={ButtonVariant.secondary}
                        size={ButtonSize.small}
                        className='w-full'
                    >
                        Купить билет
                    </Button>
                </TicketButtonWrapper>
                <Link to={`/events/${to}`} className='flex-1'>
                    <Button
                        variant={ButtonVariant.tertiary}
                        size={ButtonSize.small}
                        className='w-full'
                    >
                        Подробнее
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default EventCardMobile;