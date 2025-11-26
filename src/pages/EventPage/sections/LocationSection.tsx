import Text, {TextVariant} from "../../../components/Text.tsx";

interface LocationSectionProps {
    location: string;
    address: string;
    photos: string[];
}

const LocationSection = ({location, address, photos}: LocationSectionProps) => {

    if(photos.length === 0) {
        return <Text className='text-lightgray' variant={TextVariant.CAPTION}>
            Фотографии концертной площадки появятся в ближайшее время. Следите за обновлениями!
        </Text>
    }

    return (
        <section id='location' className='flex flex-col gap-10 xl:gap-[60px]'>
            <Text variant={TextVariant.H2}>ПЛОЩАДКА</Text>
            <div className='flex flex-col gap-[30px] xl:gap-10'>
                <div className='flex flex-col gap-2'>
                    <Text variant={TextVariant.H4}>{location}</Text>
                    <Text className='text-lightgray' variant={TextVariant.P}>{address}</Text>
                </div>
                <div className='flex flex-col lg:flex-row justify-between gap-2.5'>
                    {photos.map((photo) => (
                        <img className='md:w-[49%]' src={photo} alt={photo} key={photo} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LocationSection;