import {Event} from "../../../types/event.ts";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";
import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import {getDate} from "../../../utils/getDate.ts";
import exampleImage from '../../../assets/example-image.png'

interface HeroProps {
    item: Event
}


const HeroMobile = ({item}: HeroProps) => {
    const datetime = getDate(item.date)

    return (
        <section id='hero' className='flex flex-col gap-10'>
            <div className='relative'>
                <div className='h-11 w-11 bg-darkgray rounded-full absolute top-2.5 right-[7px] z-10 flex justify-center items-center text-center'>
                    <Text variant={TextVariant.P}>{item.age}+</Text>
                </div>
                {item.video
                    ? <VideoPlayer key={item.video} video={item.video} className='' />
                    : <img className='h-full w-full object-cover' alt={''} src={exampleImage}/>}
            </div>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-7'>
                    <Text className='leading-none' variant={TextVariant.H1}>{item.title.toUpperCase()}</Text>
                    <div className='flex flex-col gap-[30px]'>
                        <div className='flex leading-none h-[52px] gap-[13px]'>
                            <p className='font-display font-medium text-[52px] lining-nums'>{datetime.day}</p>
                            <div className=' '>
                                <p className='font-display font-medium text-[28px] tracking-[0.07em]'>{datetime.time}</p>
                                <p className='font-display font-medium text-[24px] tracking-[0.07em]'>{datetime.monthStr}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <Text variant={TextVariant.B}>г. {item.city}</Text>
                                <Text variant={TextVariant.P}>{item.location}</Text>
                            </div>
                            <div>
                                <Text variant={TextVariant.B}>1 час 20 минут</Text>
                                <Text variant={TextVariant.P}>Продолжительность концерта</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <TicketButton className='w-[90vw] h-[45px]' eventId={item.eventId}/>
            </div>

        </section>
    );
};

export default HeroMobile;