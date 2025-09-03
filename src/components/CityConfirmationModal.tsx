import Text, {TextVariant} from "./Text.tsx";
import Button, {ButtonVariant} from "./Buttons/Button.tsx";
import {useNavigate} from "react-router";

interface CityConfirmationModalProps {
    city?: string | null
    onConfirm: () => void;
    onChangeCity: () => void;
}

const CityConfirmationModal = ({ city, onConfirm, onChangeCity }:CityConfirmationModalProps) => {

    const navigate = useNavigate()
    const handleClick = () => {
        onConfirm();
        navigate(0);
    }

    return (
        <div className='fixed md:absolute left-0 md:top-8 w-full md:w-fit bg-semi-darkgray p-6 flex h-117 md:h-auto'>
            <div className='flex flex-col gap-5 items-start md:items-center md:w-[255px]'>
                {city
                    ? <>
                        <Text variant={TextVariant.P}>Ваш город {city}?</Text>
                        <div className='flex gap-4 items-center'>
                            <Button className='w-[40vw] md:w-20 h-8' onClick={onChangeCity} variant={ButtonVariant.outline}>Нет</Button>
                            <Button className='w-[40vw] md:w-20 h-8' onClick={handleClick} variant={ButtonVariant.primary}>Да</Button>
                        </div>
                    </>
                    : <>
                        <Text variant={TextVariant.P}>Не удалось определить город</Text>
                        <Button className='w-40 h-11' onClick={onChangeCity} variant={ButtonVariant.outline}>Выбрать город</Button>
                    </>
                }
            </div>

        </div>
    );
};

export default CityConfirmationModal;