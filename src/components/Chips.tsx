import {WordPressCategory} from "../api";
import Text, {TextVariant} from "./Text.tsx";
import CloseIcon from '../assets/icons/ic_close.svg?react'

export enum ChipsSize {
    large = 'large',
    medium = 'medium',
}

interface ChipsProps {
    size?: ChipsSize;
    options: WordPressCategory[];
    onItemClose: (option: WordPressCategory) => void;
}

export const Chips = ({size=ChipsSize.medium, options, onItemClose} : ChipsProps) => {

    const sizeStyleMap = {
        [ChipsSize.large]: {
            style: 'h-[52px]',
            text: TextVariant.Subtitle_M
        },
        [ChipsSize.medium]: {
            style: 'h-11',
            text: TextVariant.Subtitle_S
        }
    }

    return (
        <div className='flex gap-2 flex-wrap xl:flex-nowrap overflow-x-auto scrollbar-hide'>
            {options.map((item) => (
                <div
                    className={`flex gap-2 p-3 items-center min-w-fit ${sizeStyleMap[size].style}
                    bg-button-tertiary-default hover:bg-button-tertiary-hover transition-colors`}
                    key={item.id + '_chips'}
                >
                    <Text variant={sizeStyleMap[size].text}>{item.name}</Text>
                    <div onClick={() => onItemClose(item)}>
                        <CloseIcon/>
                    </div>
                </div>
            ))}

        </div>
    );
};
