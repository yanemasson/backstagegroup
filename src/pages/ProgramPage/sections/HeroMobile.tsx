import {Program} from "../../../types/events/program.ts";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";
import Text, {TextVariant} from "../../../components/Text.tsx";
import videoPosterMobile from "../../../assets/video_poster_mobile.png";
import {memo, useMemo} from "react";
import {getDuration} from "../../../utils/getDuration.ts";
import Breadcrumbs from "../../../components/Breadcrumbs.tsx";

interface HeroProps {
    item: Program
}

const HeroMobile = memo(({item}: HeroProps) => {
    const title = useMemo(() => item.title.toUpperCase(), [item.title]);
    const posterSrc = item.poster || videoPosterMobile;
    const hasVideo = item.video && item.video.length > 0;

    return (
        <section className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
                <div className='flex'>
                    <Breadcrumbs isFirst={true} to='/'>Главная</Breadcrumbs>
                    <Breadcrumbs to='/programs'>Программы</Breadcrumbs>
                    <Breadcrumbs isLast={true}>{item.title}</Breadcrumbs>
                </div>

                <div className='relative'>
                    {!hasVideo
                        ? <img
                            className='h-full w-full object-cover'
                            alt={item.title}
                            src={posterSrc}
                            loading="eager"
                            fetchPriority="high"
                        />
                        : <VideoPlayer buttonType='mute' key={item.video} video={item.video} className='w-full object-cover' />}
                </div>

                <div className='flex flex-col gap-2'>
                    <h1><Text className='leading-none' variant={TextVariant.H1}>{title}</Text></h1>
                    <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{item.descriptionShort}</Text>
                </div>


            </div>


            <div className='flex flex-col gap-6'>

                <Text variant={TextVariant.Body_L}>{getDuration(item.duration)}</Text>
                <Text className='text-text-tertiary' variant={TextVariant.Body_M}>Продолжительность концерта</Text>
                <Text variant={TextVariant.Body_L}>{item.age + '+'}</Text>
            </div>
        </section>
    );
});

export default HeroMobile;