import Text, {TextVariant} from "../../../components/Text.tsx";
import DownIcon from '../../../assets/icons/arrows/ic_down.svg?react'

interface CitySelectionProps {
    city: string | null;
    onClick: () => void;
}

const CitySelection = ({city, onClick}: CitySelectionProps) => {

    return (
        <div className='group flex items-center transition-colors ' onClick={onClick}>
            <Text variant={TextVariant.Body_S} className=' group-hover:text-button-primary-hover group-active:text-text-tertiary transition-200'>
                {city}
            </Text>
            <div className='text-text-accent group-hover:text-button-primary-hover group-active:text-text-tertiary transition-200'>
                <DownIcon/>
            </div>
        </div>
    );
};

export default CitySelection;