import {Review} from "../types/review.ts";
import Text, {TextVariant} from "./Text.tsx";
import {getDate} from "../utils/getDate.ts";
import {useState} from "react";
import {truncateToWord} from "../utils/truncateToWord.ts";
import {useMediaBreakpoint} from "../hooks/useMediaBreakpoint.ts";
import Button, {ButtonSize, ButtonVariant} from "./Buttons/Button.tsx";

const ReviewComponent = ({review}: {review: Review}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dayMonth = () => {
        const day = getDate(review.date).day
        const formattedDay = Number(day) < 10 ? day.slice(1, 2) : day
        return formattedDay + ' ' + getDate(review.date).monthStr
    }

    const md = useMediaBreakpoint('md')

    return (
        <div
            className={`flex flex-col min-w-[85vw] lg:min-w-[368px] min-h-[264px] justify-between bg-bg-island p-6 ${isOpen ? 'h-full' : 'h-[264px]'}`}
            onClick={() => !md && setIsOpen(!isOpen)}
        >
            <div className='flex flex-col gap-3'>
                <div className='flex justify-between'>
                    <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{review.name}</Text>
                    <Text className='text-text-tertiary' variant={TextVariant.Body_M}>{dayMonth()}</Text>
                </div>
                <div className='inline'>
                    {!isOpen
                        ? <Text variant={TextVariant.Body_L} className='inline'>{truncateToWord(review.text, 120)}...</Text>
                        : <Text variant={TextVariant.Body_L}>{review.text}</Text>
                    }
                </div>
            </div>


            <div className='flex justify-between items-center '>
                <Text className='text-text-tertiary ' variant={TextVariant.Body_M}>{'г. ' + review.city}</Text>
                <Button
                    className='w-[110px]'
                    variant={ButtonVariant.shadow}
                    size={ButtonSize.small}
                    onClick={() => {setIsOpen(!isOpen)}}
                >
                    {isOpen ? "Закрыть" : "Открыть" }
                </Button>
            </div>
        </div>
    );
};

export default ReviewComponent;