import Text, {TextVariant} from "./Text.tsx";
import {ReactNode} from "react";

export enum TabButtonSize {
    medium = 'medium',
    small = 'small',
}

interface TabProps {
    children: ReactNode;
    size?: TabButtonSize;
    isActive?: boolean;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Tab = (
    {
        children,
        size = TabButtonSize.medium,
        isActive = false,
        disabled = false,
        className,
        onClick
    } : TabProps) => {

    const sizeStyleMap = {
        [TabButtonSize.medium]: {
            style: 'min-h-[52px]',
            text: TextVariant.Subtitle_M
        },
        [TabButtonSize.small]: {
            style: 'min-h-11',
            text: TextVariant.Subtitle_S
        }
    }

    const handleClick = () => {
        if (disabled) {
            return;
        }
        if (onClick) {
            onClick();
        }
    }

    const style = 'border-solid border-x-0 border-t-0 border-b-[2px] flex items-center justify-center transition-colors duration-200 cursor-pointer border-divider-default hover:text-text-accent'
    const activeStyle = 'border-divider-accent text-text-accent'
    const disabledStyle = 'cursor-default text-button-disabled-gray hover:text-button-disabled-gray'

    return (
        <button
            onClick={handleClick}
            className={`${style} ${sizeStyleMap[size].style} ${className} ${isActive ? activeStyle : ''} ${disabled ? disabledStyle : ''}`}
        >
            <Text variant={sizeStyleMap[size].text}>{children}</Text>

        </button>
    );
};

export default Tab;