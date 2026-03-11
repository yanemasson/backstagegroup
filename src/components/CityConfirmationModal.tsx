import Text, {TextVariant} from "./Text.tsx";
import {useNavigate} from "react-router";
import Button, {ButtonSize, ButtonVariant} from "./Buttons/Button.tsx";

interface CityConfirmationModalProps {
    city?: string | null
    onConfirm: () => void;
    onChangeCity: () => void;
}

const CityConfirmationModal = ({ city, onConfirm, onChangeCity }:CityConfirmationModalProps) => {

    const navigate = useNavigate()
    const handleConfirm = () => {
        onConfirm();
        navigate('/')
    }

    return (
        <div className="fixed top-[76px] left-0 md:top-[92px] md:left-4 p-4 flex flex-col gap-4 w-full md:w-[360px] bg-bg-island">
            <Text variant={TextVariant.Subtitle_M}>{`Ваш город - ${city}?`}</Text>
            <div className='flex gap-3 '>
                <Button
                    className='flex-1'
                    size={ButtonSize.small}
                    variant={ButtonVariant.tertiary}
                    onClick={() => onChangeCity()}
                >
                    Сменить город
                </Button>
                <Button
                    className='flex-1'
                    size={ButtonSize.small}
                    variant={ButtonVariant.primary}
                    onClick={() => handleConfirm()}
                >
                    Да, верно
                </Button>
            </div>
        </div>
    );
};

export default CityConfirmationModal;