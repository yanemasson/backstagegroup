import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";
import {Program} from '../../../types/program.ts'
import Text, {TextVariant} from "../../../components/Text.tsx";
import videoPosterDesktop from '../../../assets/video_poster_desktop.png'
import {memo, useMemo} from "react";
import {Link} from "react-router";

interface HeroProps {
    item: Program
}

const HeroDesktop = memo(({item}: HeroProps) => {
    const title = useMemo(() => item.title.toUpperCase(), [item.title]);
    const posterSrc = item.poster || videoPosterDesktop;
    const hasVideo = item.video && item.video.length > 0;

    return (
        <section id='hero' className='flex flex-col h-full gap-5'>
            <div className='flex justify-between'>
                <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                    <Link className='hover:text-white transition-colors ' to={'/'}>Главная</Link>
                    {` · `}
                    <Link className='hover:text-white transition-colors ' to={'/#eventlist'}>Программы</Link>
                    {` · ${item.title}`}
                </Text>
                <div className='flex gap-2'>
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

            <div className='flex w-full gap-[108px] items-end space-between'>

                <div className='flex flex-col justify-between'>
                    <div className='flex flex-col gap-5'>
                        <Text className='leading-none' variant={TextVariant.H1}>{title}</Text>
                        <Text className='text-dark-text w-[500px]' variant={TextVariant.P}>{item.descriptionShort}</Text>
                    </div>

                </div>

            </div>
        </section>
    );
});

export default HeroDesktop;