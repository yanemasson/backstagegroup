import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import image from '/public/images/image 56.png'

interface InformationProps {
    description: string;
    eventId: number;
}

const Information = ({description, eventId}: InformationProps) => {
    const md = useMediaBreakpoint('md')
    return (
        <section className='flex flex-col gap-10 xl:gap-[50px]' id='description'>
            <Text className='leading-none flex flex-col xl:flex-row xl:gap-3' variant={TextVariant.H2}>
                <p className='text-light-brown'>ОПИСАНИЕ</p>
                <p>ПРОГРАММЫ</p>
            </Text>
            <div className='xl:flex md:grid grid-cols-2 gap-[108px] xl:gap-[60px]'>
                <div className='flex flex-col gap-10 justify-between'>
                    <Text className='whitespace-pre-wrap' variant={TextVariant.P}>{description}</Text>
                    <TicketButton className='w-[90vw] h-[45px] lg:w-[284px] lg:h-[53px]' eventId={eventId}/>
                </div>
                {md && <img alt='' className='xl:w-[572px] xl:h-[326px]' src={image}/>}

            </div>
        </section>
    );
};

export default Information;