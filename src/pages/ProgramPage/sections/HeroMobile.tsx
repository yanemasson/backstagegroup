import {Program} from "../../../types/program.ts";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";
import Text, {TextVariant} from "../../../components/Text.tsx";
import videoPosterMobile from "../../../assets/video_poster_mobile.png";
import {memo, useMemo} from "react";
import {getDuration} from "../../../utils/getDuration.ts";
import {Link} from "react-router";

interface HeroProps {
    item: Program
}

const HeroMobile = memo(({item}: HeroProps) => {
    const title = useMemo(() => item.title.toUpperCase(), [item.title]);
    const posterSrc = item.poster || videoPosterMobile;
    const hasVideo = item.video && item.video.length > 0;

    return (
        <section id='hero' className='flex flex-col gap-5'>
            <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                <Link className='hover:text-white transition-colors ' to={'/'}>Главная</Link>
                {` · `}
                <Link className='hover:text-white transition-colors ' to={'/#eventlist'}>Программы</Link>
                {` · ${item.title}`}
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
                        <Text variant={TextVariant.CAPTION} className='text-dark-text'>{item.age + '+'}</Text>
                    </div>
                    <Text className='leading-none' variant={TextVariant.H1}>{title}</Text>
                    <Text variant={TextVariant.P} className='text-dark-text'>{item.descriptionShort}</Text>
                </div>


                <div className='flex flex-col gap-2'>
                    <Text variant={TextVariant.P}>{getDuration(item.duration)}</Text>
                </div>
            </div>
        </section>
    );
});

export default HeroMobile;