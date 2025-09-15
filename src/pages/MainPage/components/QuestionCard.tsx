import Text, {TextVariant} from "../../../components/Text.tsx";
import ExpandButton from "../../../components/Buttons/ExpandButton.tsx";
import {ReactNode, useState} from "react";

interface QuestionCardProps {
    question: string;
    answer: ReactNode;
    isLast: boolean;
}

const QuestionCard = ({question, answer, isLast}: QuestionCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='flex flex-col gap-5 md:gap-[30px]'>
            <div onClick={() => setIsOpen(!isOpen)} className='flex justify-between'>
                <Text variant={TextVariant.H4} className='max-w-[285px] md:max-w-full'>{question}</Text>
                <ExpandButton isOpen={isOpen} full={false}/>
            </div>
            {isOpen &&
                <Text variant={TextVariant.P} className='text-dark-text'>{answer}</Text>
            }
            {!isLast && <div className='w-full border-solid border-semi-darkgray border-t-[2px] border-x-0 border-b-0'/>}
        </div>
    );
};

export default QuestionCard;