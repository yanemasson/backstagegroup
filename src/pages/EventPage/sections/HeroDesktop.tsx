import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";
import {Event} from '../../../types/event.ts'
import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButtonWrapper from "../../../components/Buttons/TicketButtonWrapper.tsx";
import {getDate} from "../../../utils/getDate.ts";
import videoPosterDesktop from '../../../assets/video_poster_desktop.png'
import {getDuration} from "../../../utils/getDuration.ts";
import {memo, useMemo} from "react";
import Button, {ButtonSize, ButtonVariant} from "../../../components/Buttons/Button.tsx";
import Breadcrumbs from "../../../components/Breadcrumbs.tsx";

interface HeroProps {
    item: Event
}

const HeroDesktop = memo(({item}: HeroProps) => {
    const datetime = getDate(item.date)
    const title = useMemo(() => item.title.toUpperCase(), [item.title]);
    const posterSrc = item.poster || videoPosterDesktop;
    const hasVideo = item.video && item.video.length > 0;

    return (
        <section id='hero' className='flex flex-col gap-4'>
            <div className='flex'>
                <Breadcrumbs isFirst={true} to='/'>Главная</Breadcrumbs>
                <Breadcrumbs to='/events'>Афиша</Breadcrumbs>
                <Breadcrumbs isLast={true}>{datetime.day + ' ' + datetime.monthStr}</Breadcrumbs>
            </div>

            <div className='h-[420px] relative'>
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

            <div className='flex w-full justify-between'>

                <div className='flex flex-col gap-6'>
                    <div>
                        <h1><Text className='leading-none' variant={TextVariant.H1}>{title}</Text></h1>
                        <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{item.descriptionShort}</Text>
                    </div>
                    <TicketButtonWrapper eventId={item.eventId}>
                        <Button className='w-40' size={ButtonSize.medium} variant={ButtonVariant.primary}>Купить билет</Button>
                    </TicketButtonWrapper>
                </div>

                <div className='flex flex-col gap-6'>
                    <div className='flex gap-8'>
                        <div className='flex gap-3'>
                            <Text className='-translate-y-2' variant={TextVariant.Number_L}>{datetime.day}</Text>
                            <div className='flex flex-col justify-around'>
                                <Text variant={TextVariant.Body_L}>
                                    {String(datetime.monthStr).charAt(0).toUpperCase() + String(datetime.monthStr).slice(1)}
                                </Text>
                                <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{datetime.weekday}</Text>
                            </div>
                        </div>
                        <Text className='translate-y-1' variant={TextVariant.Number_S}>{datetime.time}</Text>
                    </div>

                    <div className='flex flex-col gap-6'>
                        <div>
                            <Text variant={TextVariant.Body_L}>{item.location}</Text>
                            <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{'г. ' + item.city}</Text>
                        </div>
                        <div>
                            <Text variant={TextVariant.Body_L}>{getDuration(item.duration)}</Text>
                            <Text className='text-text-tertiary' variant={TextVariant.Body_M}>Продолжительность концерта</Text>

                        </div>
                        <Text variant={TextVariant.Body_L}>{item.age + '+'}</Text>

                    </div>
                </div>

            </div>
        </section>
    );
});

export default HeroDesktop;