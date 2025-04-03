import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";


interface LocationSectionProps {
    location: string;
    address: string;
    eventId: number;
    photos: string[];
}

const LocationSection = ({location, address, eventId, photos}: LocationSectionProps) => {
    const md = useMediaBreakpoint('md')
    console.log(photos)

    if(photos.length === 0) {
        return <Text className='text-lightgray' variant={TextVariant.CAPTION}>
            Фотографии концертной площадки появятся в ближайшее время. Следите за обновлениями!
        </Text>
    }

    return (
        <section id='location' className='flex flex-col gap-10 xl:gap-[52px]'>
            <Text variant={TextVariant.H2}>ПЛОЩАДКА</Text>
            <div className='flex flex-col gap-[23px]'>
                <div className='flex justify-between '>
                    <img className='md:w-[49%]' src={photos[0]} alt='location1' />
                    {md && <img className='md:w-[49%]' src={photos[1]} alt='location2' />}
                </div>
                <div className='flex flex-col gap-10 xl:gap-[50px] w-[284px]'>
                    <div className='flex flex-col gap-2.5 w-3/4 xl:w-full'>
                        <Text className='text-light-brown leading-none' variant={TextVariant.H4}>{location}</Text>
                        <Text className='' variant={TextVariant.P}>{address}</Text>
                    </div>
                    <TicketButton className='w-[90vw] h-[45px] xl:w-[284px] xl:h-[53px]' eventId={eventId}/>
                </div>

            </div>
        </section>
    );
};

export default LocationSection;