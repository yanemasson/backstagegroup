import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import image from '/public/images/image 56.png'

interface InformationProps {
    description: string;
    eventId: number;
}

const Information = ({description, eventId}: InformationProps) => {
    const xl = useMediaBreakpoint('xl')
    return (
        <section className='flex flex-col gap-10 xl:gap-[50px]' id='description'>
            <Text className='leading-none flex flex-col xl:flex-row xl:gap-3' variant={TextVariant.H2}>
                <p className='text-light-brown'>ОПИСАНИЕ</p>
                <p>ПРОГРАММЫ</p>
            </Text>
            <div className='flex gap-[60px]'>
                <div className='flex flex-col gap-10 justify-between'>
                    <Text className='whitespace-pre-wrap' variant={TextVariant.P}>{description}</Text>
                    <TicketButton className='w-[321px] h-[45px] xl:w-[284px] xl:h-[53px]' eventId={eventId}/>
                </div>
                {xl && <img alt='' className='w-[572px]' src={image}/>}

            </div>
        </section>
    );
};

export default Information;