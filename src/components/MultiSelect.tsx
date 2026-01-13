import { useState, useRef, useEffect } from 'react';
import Text, {TextVariant} from "./Text.tsx";
import {WordPressCategory} from "../api";
import UpIcon from '../assets/icons/arrows/ic_up.svg?react'
import DownIcon from '../assets/icons/arrows/ic_down.svg?react'
import BoxIcon from '../assets/icons/checkbox/ic_box.svg?react'
import CheckboxIcon from '../assets/icons/checkbox/ic_checkbox.svg?react'

export enum SelectSize {
    large = 'large',
    medium = 'medium',
}

interface MultiSelectProps {
    options: WordPressCategory[];
    selectedValues: WordPressCategory[];
    onChange: (selected: WordPressCategory[]) => void;
    className?: string;
    size?: SelectSize;
}


const MultiSelect = ({options, selectedValues, onChange, className, size = SelectSize.medium}:MultiSelectProps) => {

    const sizeStyleMap = {
        [SelectSize.large]: {
            style: 'h-[52px]',
            text: TextVariant.Body_L,
            checkboxSize: 'w-6 h-6',
            checkboxText: TextVariant.Checkbox_L,
        },
        [SelectSize.medium]: {
            style: 'h-11',
            text: TextVariant.Body_M,
            checkboxSize: 'w-5 h-5',
            checkboxText: TextVariant.Checkbox_M,
        },
    }

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Закрытие дропдауна при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Проверка, выбрана ли опция
    const isOptionSelected = (option: WordPressCategory) => {
        return selectedValues.some(item => item.id === option.id);
    };

    const handleOptionClick = (option: WordPressCategory) => {
        if (isOptionSelected(option)) {
            onChange(selectedValues.filter(item => item.id !== option.id));
        } else {
            onChange([...selectedValues, option]);
        }
    };

    return (
        <div className={`relative group ${sizeStyleMap[size].style} ${className}`} ref={dropdownRef}>
            <div
                className={`flex items-center justify-between px-3.5 h-full w-full cursor-pointer
                border-x-0 border-t-0 border-[1px] border-solid border-divider-default
                ${isOpen ? 'bg-bg-island' : 'bg-button-tertiary-default'}  transition-colors hover:bg-button-shadow-hover`}
                onClick={() => setIsOpen(!isOpen)}>
                <Text variant={sizeStyleMap[size].text}>Жанр</Text>
                <div className={`group-hover:text-button-primary-hover ${isOpen ? 'text-ic-tertiary' : 'text-ic-primary'}`}>
                    {isOpen ? <UpIcon /> : <DownIcon />}
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full bg-bg-island overflow-auto">

                    {options.map((option)=> (
                        <div
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            className={`flex gap-2 items-center bg-bg-island px-4 hover:bg-button-tertiary-hover group/opt
                            border-x-0 border-t-0 border-[1px] border-solid border-divider-default cursor-pointer
                            ${sizeStyleMap[size].style} `}
                        >
                            <div
                                className={`relative group-hover/opt:text-button-primary-hover 
                                ${isOptionSelected(option) ? 'text-button-primary-active' : ''}`}
                            >
                                {isOptionSelected(option) ? <CheckboxIcon /> : <BoxIcon />}
                            </div>

                            <Text
                                variant={sizeStyleMap[size].checkboxText}
                                className={`${isOptionSelected(option) ? 'text-button-primary-active' : 'text-ic-primary    '}`}
                            >{option.name}</Text>
                        </div>
                    ))}

                    {options.length === 0 && (
                        <div className="px-4 py-2 text-gray-500">Нет доступных опций</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;