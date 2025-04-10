import Text, {TextVariant} from "../Text.tsx";
import {Event} from "../../types/event.ts"
import {getDate} from "../../utils/getDate.ts";
import Button, {ButtonVariant} from "../Buttons/Button.tsx";
import {Link} from "react-router";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import TicketButton from "../Buttons/TicketButton.tsx";
import videoPosterDesktop from "../../assets/video_poster_desktop.png";

interface EventCardProps {
    item: Event,
    to: string
}

const EventCardDesktop = ({item, to}: EventCardProps) => {
    const datetime = getDate(item.date)

    return (
        <div className='flex items-start text-start flex-row justify-between min-h-[255px]'>

            <div className='flex w-[198px] h-[255px] justify-between flex-col'>
                <div className='flex leading-none h-[52px] gap-[13px]'>
                    <p className='font-display font-medium text-[52px] lining-nums'>{datetime.day}</p>
                    <div className=' '>
                        <p className='font-display font-medium text-[28px] tracking-[0.07em]'>{datetime.time}</p>
                        <p className='font-display font-medium text-[24px] tracking-[0.07em]'>{datetime.monthStr}</p>
                    </div>
                </div>
                <div>
                    <Text variant={TextVariant.B}>г. {item.city}</Text>
                    <Text variant={TextVariant.P}>{item.location}</Text>
                </div>
            </div>

            <div className='pl-10 border-solid border-gray border-l-2 border-y-0 border-r-0
                flex flex-col justify-between h-[255px] min-w-[452px]'>
                <div className='flex flex-col gap-5'>
                    <div className='flex justify-between'>
                        <Text className='leading-none whitespace-pre-line' variant={TextVariant.H3}>
                            {item.title.toUpperCase().split(' ').join('\n')}
                        </Text>
                        <div className='h-11 w-11 bg-[#8A8A8A33] rounded-full flex justify-center items-center text-center'>
                            <Text variant={TextVariant.P}>{item.age}+</Text>
                        </div>
                    </div>
                    <Text className='w-[331px]' variant={TextVariant.P}>{item.descriptionShort}</Text>
                </div>
                <div className='flex gap-2.5'>
                    <TicketButton className='w-[201px] h-[43px]' eventId={item.eventId}/>
                    <Link to={`/events/${to}`}>
                        <Button className='w-[201px] h-[43px]' variant={ButtonVariant.outline}>Подробнее</Button>
                    </Link>
                </div>
            </div>

            <div className="min-w-[454px] w-[454px] h-[255px]">
                {!item.video || item.video?.length === 0
                    ? <img
                        className='h-full w-full object-cover'
                        alt={item.poster ? item.poster : videoPosterDesktop}
                        src={item.poster ? item.poster : videoPosterDesktop}
                    />
                    : <VideoPlayer buttonType='mute' key={item.video} video={item.video} className='w-full object-cover' />}
            </div>

        </div>
    );
};

export default EventCardDesktop;