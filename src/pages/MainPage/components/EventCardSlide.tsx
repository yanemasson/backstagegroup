import {Event} from '../../../types/event'
import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButtonWrapper from "../../../components/Buttons/TicketButtonWrapper.tsx";
import Button, {ButtonVariant} from "../../../components/Buttons/Button.tsx";
import {getDate} from "../../../utils/getDate.ts";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import InTicketButtonWrapper from "../../../components/Buttons/InTicketButtonWrapper.tsx";

interface EventCardSlideProps {
    event: Event
}

const EventCardSlide = ({event}: EventCardSlideProps) => {
    const datetime = getDate(event.date)
    const md = useMediaBreakpoint('md')
    return (
        <div className='md:w-[1166px] w-screen overflow-hidden'>
            <div className='relative w-full h-[613px] flex md:items-start items-end'>
                <div
                    className='absolute inset-0 w-full h-full bg-cover bg-center'
                    style={{ backgroundImage: `url(${event.poster})` }}
                />

                {md
                    ? <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent' />
                    : <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
                }


                <div className='relative z-10 flex flex-col gap-5 p-5 md:pt-[210px] md:pl-[30px]'>
                    <div className='flex flex-col w-fit'>
                        <Text className='text-dark-text self-end -mr-5' variant={TextVariant.CAPTION}>{event.age}+</Text>
                        <Text variant={TextVariant.H2} className='text-white'>
                            {event.title.toUpperCase().split(' ').map((item) => <p key={item}>{item}</p>)}
                        </Text>
                    </div>

                    <div className='flex gap-5'>
                        <div className='flex items-end text-end'>
                            <p className='font-display font-medium text-[28px] lining-nums leading-[1.5] md:mr-1 mr-2.5 -mb-2 md:-mb-1 text-white'>
                                {datetime.day}
                            </p>
                            <Text variant={TextVariant.P} className='mr-3 text-white'>
                                {datetime.monthStr}
                            </Text>
                            <Text variant={TextVariant.CAPTION} className='text-dark-text'>
                                {datetime.weekdayShort}
                            </Text>
                        </div>
                        <div className='h-10 border-solid border-y-0 border-x-[1px] border-gray-300'/>
                        <div className='flex items-end text-end gap-3'>
                            <p className='font-display proportional-nums text-[32px] leading-[1.3] text-white'>
                                {datetime.time}
                            </p>
                            {md &&
                                <Text variant={TextVariant.CAPTION} className='text-dark-text'>
                                    {event.location}
                                </Text>
                            }
                        </div>
                    </div>

                    {md &&
                        <Text variant={TextVariant.P} className='text-dark-text w-[488px]'>
                            {event.descriptionShort}
                        </Text>
                    }

                    {event.eventId.toString().length > 7
                        ? <InTicketButtonWrapper eventId={event.eventId}>
                            <Button className=' md:w-[284px] w-[90vw] h-[53px]' variant={ButtonVariant.primary}>
                                Купить билет
                            </Button>
                        </InTicketButtonWrapper>
                        : <TicketButtonWrapper eventId={event.eventId}>
                            <Button className=' md:w-[284px] w-[90vw] h-[53px]' variant={ButtonVariant.primary}>
                                Купить билет
                            </Button>
                        </TicketButtonWrapper>
                    }


                </div>
            </div>
        </div>
    );
};

export default EventCardSlide;