import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";

import firstImage from '/public/images/locationsPhoto/image 23.png'
import secondImage from '/public/images/locationsPhoto/image 23 (1).png'

interface LocationSectionProps {
    location: string;
    address: string;
    eventId: number;
}

const LocationSection = ({location, address, eventId}: LocationSectionProps) => {
    const xl = useMediaBreakpoint('xl')

    return (
        <section id='location' className='flex flex-col xl:gap-[52px]'>
            <Text variant={TextVariant.H2}>ПЛОЩАДКА</Text>
            <div className='flex flex-col gap-[23px]'>
                <div className='flex gap-2.5'>
                    <img src={firstImage} alt='location1' />
                    {xl && <img src={secondImage} alt='location2' />}
                </div>
                <div className='flex flex-col gap-10 xl:gap-[50px] w-[284px]'>
                    <div className='flex flex-col gap-2.5 w-3/4 xl:w-full'>
                        <Text className='text-light-brown leading-none' variant={TextVariant.H4}>{location}</Text>
                        <Text className='' variant={TextVariant.P}>{address}</Text>
                    </div>
                    <TicketButton className='w-[320px] h-[45px] xl:w-[284px] xl:h-[53px]' eventId={eventId}/>
                </div>

            </div>
        </section>
    );
};

export default LocationSection;