import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";
import {Program} from '../../../types/program.ts'
import Text, {TextVariant} from "../../../components/Text.tsx";
import videoPosterDesktop from '../../../assets/video_poster_desktop.png'
import {memo, useMemo} from "react";
import Breadcrumbs from "../../../components/Breadcrumbs.tsx";
import {getDuration} from "../../../utils/getDuration.ts";

interface HeroProps {
    item: Program
}

const HeroDesktop = memo(({item}: HeroProps) => {
    const title = useMemo(() => item.title.toUpperCase(), [item.title]);
    const posterSrc = item.poster || videoPosterDesktop;
    const hasVideo = item.video && item.video.length > 0;

    return (
        <section className='flex flex-col gap-4'>
            <div className='flex'>
                <Breadcrumbs isFirst={true} to='/'>Главная</Breadcrumbs>
                <Breadcrumbs to='/programs'>Программы</Breadcrumbs>
                <Breadcrumbs isLast={true}>{item.title}</Breadcrumbs>
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
                    <div className='flex flex-col gap-4'>
                        <h1><Text className='leading-none' variant={TextVariant.H1}>{title}</Text></h1>
                        <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{item.descriptionShort}</Text>
                    </div>
                </div>

                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-6'>
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