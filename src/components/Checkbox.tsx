import {ReactNode} from "react";
import CheckIcon from "../assets/icons/ic_check.svg?react"

interface CheckboxProps {
    disabled?: boolean
    children?: ReactNode
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const Checkbox = ({disabled = false, children, checked, onChange}: CheckboxProps) => {


    const handleClick = () => {
        if(!disabled) {
            onChange(!checked)
        }
    }

    return (
        <div className={`gap-5 flex w-full ${!disabled && 'cursor-pointer'}`} onClick={handleClick} >
            <div
                className={`min-w-8 min-h-8 max-w-8 max-h-8 border-solid border-[1px] border-[#212020] flex items-center justify-center transition-all duration-200 relative`}
                role="checkbox"
                aria-checked={checked}
                aria-disabled={disabled}
            >
                {checked && <CheckIcon />}
            </div>
            {children}
        </div>
    );
};

export default Checkbox;