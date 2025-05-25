import { useState, useRef, useEffect } from 'react';
import Text, {TextVariant} from "./Text.tsx";
import {truncate} from "../utils/truncate.ts";
import {WordPressCategory} from "../api";

interface MultiSelectProps {
    options: WordPressCategory[];
    selectedValues: WordPressCategory[];
    onChange: (selected: WordPressCategory[]) => void;
}

const MultiSelect = ({options, selectedValues, onChange}:MultiSelectProps) => {
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


    const CustomCheckbox = ({ checked, option } : { checked: boolean, option: WordPressCategory}) => (
        <div className = "relative w-8 h-8 cursor-pointer" onClick={() => handleOptionClick(option)}>
            <div className = 'w-8 h-8 border-solid border-semi-lightgray'/>
            {checked && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.99996 12.586L1.99996 6.586L0.584961 8L7.99996 15.414L21.4145 2L19.9995 0.585999L7.99996 12.586Z"
                            fill="#C47D42"
                        />
                    </svg>
                </div>
            )}
        </div>
    );

    return (
        <div className='relative w-[284px] bg-semi-darkgray' ref={dropdownRef}>
            <div className='flex justify-between px-2.5 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                <div className="flex flex-col justify-center h-[60px] bg-semi-darkgray" >
                    <Text className='text-lightgray' variant={TextVariant.CAPTION}>Жанр</Text>
                    <Text variant={TextVariant.P}>
                        {selectedValues.length > 0 ?
                            truncate(selectedValues.map((option, index) =>
                                (index === 0 ? option.name : ' ' + option.name.toLowerCase())).toString(), 23)
                            : ('Все')
                        }
                    </Text>
                </div>

                <svg className={`${isOpen ? 'rotate-180' : ''} text-lightgray`} width="12" height="9"
                     viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L0 0H12L6 9Z" fill="currentColor" />
                </svg>
            </div>


            {isOpen && (
                <div className="absolute z-10 w-full bg-semi-darkgray overflow-auto">
                    {options.map((option)=> (
                        <div
                            key={option.id}
                            className='p-2.5 h-[52px]'
                        >
                            <div className="flex items-center gap-3">
                                <CustomCheckbox option={option} checked={isOptionSelected(option)} />
                                <Text variant={TextVariant.P}>{option.name}</Text>
                            </div>
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