import {Event} from "../../../types/event.ts";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";
import Text, {TextVariant} from "../../../components/Text.tsx";
import {getDate} from "../../../utils/getDate.ts";
import videoPosterMobile from "../../../assets/video_poster_mobile.png";
import {memo, useMemo} from "react";
import {getDuration} from "../../../utils/getDuration.ts";
import {Link} from "react-router";

interface HeroProps {
    item: Event
}

const HeroMobile = memo(({item}: HeroProps) => {
    const datetime = getDate(item.date)
    const title = useMemo(() => item.title.toUpperCase(), [item.title]);
    const posterSrc = item.poster || videoPosterMobile;
    const hasVideo = item.video && item.video.length > 0;

    return (
        <section id='hero' className='flex flex-col gap-5'>
            <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                <Link className='hover:text-white transition-colors ' to={'/'}>Главная</Link>
                {` · `}
                <Link className='hover:text-white transition-colors ' to={'/#eventlist'}>Афиша</Link>
                {` · ${getDate(item.date).day} ${getDate(item.date).monthStr}`}
            </Text>

            <div className='relative'>
                {!hasVideo
                    ? <img
                        className='h-full w-full object-cover'
                        alt={posterSrc}
                        src={posterSrc}
                        loading="eager"
                        fetchPriority="high"
                    />
                    : <VideoPlayer buttonType='mute' key={item.video} video={item.video} className='w-full object-cover' />}
            </div>

            <div className='flex flex-col gap-[30px]'>

                <div className='flex flex-col gap-2'>
                    <div className='flex items-start gap-3'>
                        <Text variant={TextVariant.CAPTION} className='text-orange'>{item.cta}</Text>
                        <Text variant={TextVariant.CAPTION} className='text-dark-text'>{item.age + '+'}</Text>
                    </div>
                    <Text className='leading-none' variant={TextVariant.H1}>{title}</Text>
                    <Text variant={TextVariant.P} className='text-dark-text'>{item.descriptionShort}</Text>
                </div>

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

                <div className='flex flex-col gap-2'>
                    <Text variant={TextVariant.P}>{item.location}</Text>
                    <Text className='text-dark-text' variant={TextVariant.P}>{`г. ${item.city}`}</Text>
                </div>

                <div className='flex flex-col gap-2'>
                    <Text variant={TextVariant.P}>{getDuration(item.duration)}</Text>
                    <Text className='text-dark-text' variant={TextVariant.P}>{`г. ${item.city}`}</Text>
                </div>
            </div>
        </section>
    );
});

export default HeroMobile;