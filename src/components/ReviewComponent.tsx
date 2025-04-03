import {Review} from "../types/review.ts";
import Text, {TextVariant} from "./Text.tsx";
import {getDate} from "../utils/getDate.ts";
import ExpandButton from "./Buttons/ExpandButton.tsx";
import {useState} from "react";
import Anchor from "./Anchor.tsx";

const ReviewComponent = ({review}: {review: Review}) => {
    const dateObj = getDate(review.date);
    const [isOpen, setIsOpen] = useState(false)

    enum Source {
        VK = "VK",
        TG = "TG",
        site = "site",
    }
    const SourceMap = {
        [Source.VK]: {name: "ВК", link: "https://vk.com/backstagegroup"},
        [Source.TG]: {name: "ТГ", link: "https://t.me/backstagegroup24"},
        [Source.site]: {name: "Сайт", link: "/"},
    }
    const SourceLink = ({ source }: {source: Review['source']}) => {
        const sourceInfo = SourceMap[source]
        return (
            <Anchor href={sourceInfo.link}>
                <Text variant={TextVariant.CAPTION}>
                    Источник: {sourceInfo.name}
                </Text>
            </Anchor>
        );
    }

    const truncateToWord = (str: string, maxLength: number) => {
        if (str.length <= maxLength) return str;
        const lastSpace = str.lastIndexOf(' ', maxLength);
        if (lastSpace === -1) return str.slice(0, maxLength);
        return str.slice(0, lastSpace);
    }

    return (
        <div className='flex flex-col xl:w-[382px] md:border-0 gap-[30px]
            border-solid border-b-1 border-gray border-x-0 border-t-0 pb-5'>
            <div className='flex flex-col gap-[15px] xl:gap-5'>
                <Text className='text-lightgray' variant={TextVariant.CAPTION}>
                    {dateObj.day}.{dateObj.monthNum}.{dateObj.year}
                </Text>
                <div className='flex flex-col gap-2.5'>
                    <Text className='text-light-brown' variant={TextVariant.H4}>{review.name}</Text>
                    {!isOpen ? <Text variant={TextVariant.P}>{truncateToWord(review.text, 70)}...</Text>
                        : <Text variant={TextVariant.P}>{review.text}</Text>
                    }
                    <ExpandButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
                </div>
            </div>
            <div>
                <SourceLink source={review.source}/>
            </div>
        </div>
    );
};

export default ReviewComponent;