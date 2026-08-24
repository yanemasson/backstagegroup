import Text, {TextVariant} from "../../../components/Text.tsx";

interface LocationSectionProps {
    location: string;
    address: string;
    photos: string[];
}

const LocationSection = ({location, address, photos}: LocationSectionProps) => {

    return (
        <section id='location' className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
                <Text variant={TextVariant.Subtitle_L}>{location}</Text>
                <Text variant={TextVariant.Body_L}>{address}</Text>
                {photos.length === 0 &&
                    <Text className='text-text-tertiary' variant={TextVariant.Body_M}>
                        Фотографии концертной площадки появятся в ближайшее время. Следите за обновлениями!
                    </Text>
                }
            </div>


            <div className='flex flex-col xl:flex-row gap-3'>
                {photos.map((photo) => (
                    <img className='w-[90vw] xl:w-[49%]' src={photo} alt={location} key={photo} loading="lazy" />
                ))}
            </div>
        </section>
    );
};

export default LocationSection;