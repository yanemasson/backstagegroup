import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";

interface LocationSectionProps {
    location: string;
    address: string;
    eventId: number;
    photos: string[];
}

const LocationSection = ({location, address, eventId, photos}: LocationSectionProps) => {

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
                    {photos.map((photo) => (
                        <img className='md:w-[49%]' src={photo} alt={photo} key={photo} />
                    ))}
                </div>
                <div className='flex flex-col gap-10 xl:gap-[50px] w-[284px]'>
                    <div className='flex flex-col gap-2.5 w-3/4 xl:w-full'>
                        <Text className='text-light-brown leading-none' variant={TextVariant.H4}>{location}</Text>
                        <Text className='' variant={TextVariant.P}>{address}</Text>
                    </div>
                    <TicketButton className='w-[90vw] h-[45px] md:w-[284px] md:h-[53px]' eventId={eventId}/>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;