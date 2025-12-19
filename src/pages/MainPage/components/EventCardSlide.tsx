import {Event} from '../../../types/event'
import Text, {TextVariant} from "../../../components/Text.tsx";
import {getDate} from "../../../utils/getDate.ts";
import StatusBar from "../../../components/StatusBar.tsx";
import Button, {ButtonSize, ButtonVariant} from "../../../components/Buttons/Button.tsx";

interface EventCardSlideProps {
    event: Event,
    activeIndex: number,
    progress: number,
    handleBarClick: (index: number) => void,
}

const EventCardSlide = ({event, activeIndex, progress, handleBarClick}: EventCardSlideProps) => {
    const datetime = getDate(event.date)
    const arr = [0, 1, 2]

    return (
        <div className='relative w-full h-full'>
            <div
                style={{ backgroundImage: `url(${event.poster})` }}
                className='absolute inset-0 bg-cover bg-center'
            >
                <div
                    className='absolute inset-0 bg-gradient-to-b from-black via-transparent to-black'
                />
            </div>

            <div className='relative z-10 w-full h-full flex lg:items-end justify-end p-4 lg:px-6 lg:py-8'>
                <div className='w-full flex flex-col gap-4 lg:gap-[37px] lg:flex-row items-end justify-end lg:justify-between'>
                    <div className='flex flex-col gap-3 lg:min-w-[650px]'>
                        <Text variant={TextVariant.Subtitle_M}>{event.city}</Text>
                        <div className='flex gap-6 items-end'>
                            <div className='flex gap-2 items-end'>
                                <Text variant={TextVariant.Number_S}>{datetime.day}</Text>
                                <Text variant={TextVariant.Subtitle_S}>{datetime.monthStr}</Text>
                            </div>
                            <Text variant={TextVariant.Number_S}>{datetime.time}</Text>
                        </div>
                        <Text variant={TextVariant.H1}>{event.title.toUpperCase()}</Text>
                    </div>

                    <div className='flex flex-col lg:flex-row-reverse self-center lg:self-end items-end w-full gap-4 lg:gap-[37px] '>
                        <Button variant={ButtonVariant.primary} size={ButtonSize.medium} className='w-full lg:w-40 self-end'>
                            Купить билет
                        </Button>

                        <div className='flex w-full lg:w-fit gap-2'>
                            {arr.map((index) => (
                                <div key={index} className='h-6 flex flex-1 lg:flex-0 items-end cursor-pointer' onClick={() => handleBarClick(index)}>
                                    <StatusBar progress={progress} isActive={index === activeIndex} className='lg:w-[84px]'/>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventCardSlide;