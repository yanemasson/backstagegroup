import Text, {TextVariant} from "../../../components/Text.tsx";
import {ReactNode, useState} from "react";
import DownIcon from "../../../assets/icons/arrows/ic_down.svg?react"
import UpIcon from "../../../assets/icons/arrows/ic_up.svg?react"


interface QuestionCardProps {
    question: string;
    answer: ReactNode;
    isLast: boolean;
}

const QuestionCard = ({question, answer, isLast}: QuestionCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`flex flex-col lg:w-[1152px] ${!isLast && 'border-solid border-x-0 border-t-0 border-b-[2px] border-b-divider-default'}`}
        >
            <div
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center justify-between min-h-[72px] cursor-pointer select-none'
            >
                <Text variant={TextVariant.Subtitle_M} className='w-[80vw]'>{question}</Text>
                {isOpen ? <UpIcon/> : <DownIcon/>}
            </div>
            {isOpen &&
                <Text variant={TextVariant.Body_L} className='text-text-tertiary pb-6'>{answer}</Text>
            }
        </div>
    );
};

export default QuestionCard;