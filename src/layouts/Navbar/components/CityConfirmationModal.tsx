import Text, {TextVariant} from "../../../components/Text.tsx";
import Button, {ButtonVariant} from "../../../components/Buttons/Button.tsx";

interface CityConfirmationModalProps {
    city?: string | null
    onConfirm: () => void;
    onChangeCity: () => void;
}

const CityConfirmationModal = ({ city, onConfirm, onChangeCity }:CityConfirmationModalProps) => {
    return (
        <div className='absolute top-24 left-[20%] lg:left-2/3 bg-black p-6 rounded-3xl shadow-xl border-white border-solid border-3'>
            <div className='flex flex-col gap-5'>
                {city
                    ? <>
                        <Text variant={TextVariant.P}>Ваш город - {city}?</Text>
                        <div className='flex flex-col lg:flex-row gap-4'>
                            <div onClick={onConfirm}><Button>Да</Button></div>
                            <div onClick={onChangeCity}><Button variant={ButtonVariant.outline}>Нет, поменять</Button></div>
                        </div>
                    </>
                    : <>
                        <Text variant={TextVariant.P}>Не удалось определить город</Text>
                        <div onClick={onChangeCity}><Button variant={ButtonVariant.outline}>Выбрать город</Button></div>
                    </>
                }

            </div>

        </div>
    );
};

export default CityConfirmationModal;
