import {Review} from "../types/review.ts";
import Text, {TextVariant} from "./Text.tsx";
import {getDate} from "../utils/getDate.ts";
import {useState} from "react";
import {truncateToWord} from "../utils/truncateToWord.ts";
import {useMediaBreakpoint} from "../hooks/useMediaBreakpoint.ts";

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
            className={`flex flex-col bg-dark-bg md:w-[382px] min-w-[290px] min-h-[254px] gap-[30px] p-5 ${isOpen ? 'h-full' : 'h-[267px]'}`}
            onClick={() => !md && setIsOpen(!isOpen)}
        >
            <div className='flex justify-between'>
                <Text className='text-lightgray' variant={TextVariant.CAPTION}>{review.name}</Text>
                <Text className='text-lightgray' variant={TextVariant.CAPTION}>{dayMonth()}</Text>
            </div>

            <div className='inline'>
                {!isOpen
                    ? <Text variant={TextVariant.P} className='inline'>
                        {md
                            ? `${truncateToWord(review.text, 120)}...`
                            : `${truncateToWord(review.text, 100)}...`
                        }
                </Text>
                    : <Text variant={TextVariant.P}>{review.text}</Text>
                }
                {!isOpen && (
                    <div
                        onClick={() => setIsOpen(true)}
                        className='inline-block cursor-pointer ml-1'
                    >
                        <Text className='text-lightgray' variant={TextVariant.P}>Еще</Text>
                    </div>
                )}
            </div>
            <div className='flex justify-between mt-auto'>
                <Text className='text-lightgray ' variant={TextVariant.CAPTION}>{'г. ' + review.city}</Text>
                {isOpen &&
                    <div className='cursor-pointer' onClick={() => setIsOpen(false)}>
                        <Text className='text-lightgray' variant={TextVariant.CAPTION}>Закрыть</Text>
                    </div>
                }
            </div>
        </div>
    );
};

export default ReviewComponent;