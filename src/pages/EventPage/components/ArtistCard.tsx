import Text, {TextVariant} from "../../../components/Text.tsx";

interface ArtistCardProps {
    name: string;
    role?: string;
    photo: string;
}

const ArtistCard = ({name, photo, role}: ArtistCardProps) => {
    return (
        <div className='flex flex-col gap-4 w-40 justify-self-center'>
            <img
                className='object-cover max-w-40 max-h-40'
                alt={photo}
                src={photo}
            />
            <div className='flex flex-col gap-1'>
                <Text variant={TextVariant.Body_L}>{name}</Text>
                {role && <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{role}</Text>}
            </div>
        </div>
    );
};

export default ArtistCard;