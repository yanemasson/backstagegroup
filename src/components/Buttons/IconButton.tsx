import {ReactNode} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum IconButtonVariant {
    FilledPrimary = 'FilledPrimary',
    FilledSecondary = 'FilledSecondary',
    NoFilledSecondary = 'NoFilledSecondary',
    NoFilledTertiary = 'NoFilledTertiary',

}
// eslint-disable-next-line react-refresh/only-export-components
export enum IconButtonSize {
    large = 'large',
    medium = 'medium',
    small = 'small',
}

interface IconButtonProps {
    children: ReactNode,
    variant?: IconButtonVariant,
    size?: IconButtonSize,
    onClick?: () => void
    disabled?: boolean
    className?: string
}

const IconButton = (
    {
        children,
        variant = IconButtonVariant.FilledPrimary,
        size = IconButtonSize.small,
        onClick,
        disabled = false,
        className
    } : IconButtonProps) => {

    const variantStyleMap = {
        [IconButtonVariant.FilledPrimary]:
            'text-button-primary-default bg-button-tertiary-default ' +
            'hover:text-button-primary-hover hover:bg-button-tertiary-hover ' +
            'active:text-button-primary-active active:bg-button-tertiary-active ' +
            'disabled:text-button-disabled-gray disabled:bg-button-tertiary-disabled',
        [IconButtonVariant.FilledSecondary]:
            'text-ic-primary bg-button-tertiary-default ' +
            'hover:text-button-primary-hover hover:bg-button-tertiary-hover ' +
            'active:text-button-primary-active active:bg-button-tertiary-active ' +
            'disabled:text-button-disabled-gray disabled:bg-button-tertiary-disabled',
        [IconButtonVariant.NoFilledSecondary]:
            'text-button-primary-default hover:text-button-primary-hover ' +
            'active:text-button-primary-active disabled:text-button-disabled-gray ',
        [IconButtonVariant.NoFilledTertiary]:
            'text-ic-primary hover:text-button-primary-hover ' +
            'active:text-button-primary-active disabled:text-button-disabled-gray ',
    }

    const sizeStyleMap = {
        [IconButtonSize.large]: 'h-[60px] w-[60px]',
        [IconButtonSize.medium]: 'h-[52px] w-[52px]',
        [IconButtonSize.small]: 'h-11 w-11',
    }

    return (
        <button
            onClick={onClick} disabled={disabled}
            className={`flex items-center justify-center transition-colors duration-100
            ${className} ${variantStyleMap[variant]} ${sizeStyleMap[size]}`}
        >
            {children}
        </button>
    );
};

export default IconButton;