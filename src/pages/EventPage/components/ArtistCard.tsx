import Text, {TextVariant} from "../../../components/Text.tsx";

interface ArtistCardProps {
    name: string;
    role?: string;
    photo: string;
}

const ArtistCard = ({name, photo, role}: ArtistCardProps) => {
    return (
        <div className='flex flex-col gap-2.5 xl:gap-5'>
            <div className='relative w-full pb-[100%] max-w-[223px] max-h-[223px] xl:w-[223px] xl:h-[223px] xl:pb-0'>
                <img
                    className='absolute top-0 left-0 w-full h-full object-cover'
                    alt={photo}
                    src={photo}
                />
            </div>
            <div className='flex flex-col gap-[5px]'>
                <Text variant={TextVariant.P}>{name}</Text>
                {role && <Text className='text-lightgray' variant={TextVariant.CAPTION}>{role}</Text>}
            </div>
        </div>
    );
};

export default ArtistCard;