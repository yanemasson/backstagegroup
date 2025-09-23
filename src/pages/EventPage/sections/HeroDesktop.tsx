import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";
import {Event} from '../../../types/event.ts'
import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButtonWrapper from "../../../components/Buttons/TicketButtonWrapper.tsx";
import {getDate} from "../../../utils/getDate.ts";
import videoPosterDesktop from '../../../assets/video_poster_desktop.png'
import {getDuration} from "../../../utils/getDuration.ts";
import {memo, useMemo} from "react";
import {Link} from "react-router";
import InTicketButtonWrapper from "../../../components/Buttons/InTicketButtonWrapper.tsx";
import Button, {ButtonVariant} from "../../../components/Buttons/Button.tsx";

interface HeroProps {
    item: Event
}

const HeroDesktop = memo(({item}: HeroProps) => {
    const datetime = getDate(item.date)
    const title = useMemo(() => item.title.toUpperCase(), [item.title]);
    const posterSrc = item.poster || videoPosterDesktop;
    const hasVideo = item.video && item.video.length > 0;

    return (
        <section id='hero' className='flex flex-col h-full gap-5'>
            <div className='flex justify-between'>
                <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                    <Link className='hover:text-white transition-colors ' to={'/'}>Главная</Link>
                    {` · `}
                    <Link className='hover:text-white transition-colors ' to={'/#eventlist'}>Афиша</Link>
                    {` · ${getDate(item.date).day} ${getDate(item.date).monthStr}`}
                </Text>
                <div className='flex gap-2'>
                    <Text variant={TextVariant.CAPTION} className='text-orange'>{item.cta}</Text>
                    <Text variant={TextVariant.CAPTION} className='text-dark-text'>{`${item.age} +`}</Text>
                </div>
            </div>

            <div className='h-[436px] relative'>
                <div className='w-full h-full flex items-center justify-center overflow-hidden'>
                    {!hasVideo
                        ? <img
                            className='h-full w-full object-cover object-top'
                            alt={posterSrc}
                            src={posterSrc}
                            loading="eager"
                            fetchPriority="high"  />
                        : <VideoPlayer buttonType='mute' key={item.video} video={item.video} className='w-full object-cover' />}
                </div>
            </div>

            <div className='flex w-full h-[257px] gap-[108px] items-end space-between'>

                <div className='flex flex-col h-full justify-between'>
                    <div className='flex flex-col gap-5'>
                        <Text className='leading-none' variant={TextVariant.H1}>{title}</Text>
                        <Text className='text-dark-text w-[500px]' variant={TextVariant.P}>{item.descriptionShort}</Text>
                    </div>

                    <div className='flex gap-2.5 items-end'>
                        {item.eventId == 67229812
                            ? <InTicketButtonWrapper  eventId={item.eventId}>
                                <Button className='w-[335px] h-[53px]' variant={ButtonVariant.primary}>Купить билет</Button>
                            </InTicketButtonWrapper>
                            : <TicketButtonWrapper className='w-[335px] h-[53px]' eventId={item.eventId}>
                                <Button className='w-[335px] h-[53px]' variant={ButtonVariant.primary}>Купить билет</Button>
                            </TicketButtonWrapper>
                        }
                    </div>

                </div>

                <div className='flex flex-col h-full gap-[30px] justify-between'>
                    <div className='flex gap-5 items-end'>
                        <div className='flex items-end'>
                            <p className='font-display min-w-[50px] font-medium text-[40px] lining-nums leading-[1.5] -mb-2 '>
                                {datetime.day}
                            </p>
                            <div className='flex flex-col items-start text-start'>
                                <Text variant={TextVariant.P}>{datetime.monthStr}</Text>
                                <Text variant={TextVariant.P} className='text-dark-text'>{datetime.weekday}</Text>
                            </div>
                        </div>
                        <div className='h-10 border-solid border-y-0 border-x-[1px] border-gray'/>
                        <p className='font-display proportional-nums text-[32px] leading-[1.3] '>{datetime.time}</p>
                    </div>

                    <div className='flex flex-col gap-2.5'>
                        <Text variant={TextVariant.P}>{item.location}</Text>
                        <Text className='text-dark-text' variant={TextVariant.P}>{`г. ${item.city}`}</Text>
                    </div>

                    <div className='flex flex-col gap-2.5'>
                        <Text variant={TextVariant.P}>{getDuration(item.duration)}</Text>
                        <Text className='text-dark-text' variant={TextVariant.P}>{`г. ${item.city}`}</Text>
                    </div>

                </div>
            </div>
        </section>
    );
});

export default HeroDesktop;