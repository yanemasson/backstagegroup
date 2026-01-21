import Text, {TextVariant} from "../../../components/Text.tsx";
import {ReactNode, useState} from "react";
import Button, {ButtonSize, ButtonVariant} from "../../../components/Buttons/Button.tsx";

interface DisclaimerProps {
    firstArticle: ReactNode;
    secondArticle: ReactNode;
}

const Disclaimer = ({firstArticle, secondArticle}: DisclaimerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col gap-3 p-6 bg-bg-island'>
            <div className='flex flex-col gap-4'>
                <Text className='text-text-accent' variant={TextVariant.Subtitle_L}>Дисклеймер</Text>
                <Text className='inline' variant={TextVariant.Body_L}>{firstArticle}</Text>
                {isOpen && <Text variant={TextVariant.Body_L} className='inline'>{secondArticle}</Text>}
            </div>
            <Button
                className='self-end w-[110px]'
                size={ButtonSize.small}
                onClick={() => setIsOpen(!isOpen)}
                variant={ButtonVariant.shadow}
            >
                {isOpen ? <>Закрыть</> : <>Открыть</>}
            </Button>
        </div>
    );
};

export default Disclaimer;