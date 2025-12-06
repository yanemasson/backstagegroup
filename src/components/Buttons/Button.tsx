import {ReactNode} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonVariant {
    primary = 'primary',
    secondary = 'secondary',
    tertiary = 'tertiary',
    shadow = 'shadow',
}

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonSize {
    large = 'large',
    medium = 'medium',
    small = 'small',
}

interface ButtonProps {
    children: ReactNode,
    variant?: ButtonVariant,
    size?: ButtonSize,
    onClick?: () => void
    disabled?: boolean
    className?: string
}
const Button = (
    {
        children,
        variant = ButtonVariant.primary,
        size = ButtonSize.large,
        onClick,
        disabled = false,
        className
    } : ButtonProps) => {

    const variantStyleMap = {
        [ButtonVariant.primary]:
            'text-text-primary bg-button-primary-default ' +
            'hover:bg-button-primary-hover ' +
            'active:bg-button-primary-active ' +
            'disabled:bg-button-primary-disabled',
        [ButtonVariant.secondary]:
            'border-solid border-[2px] border-button-secondary-default text-button-secondary-default' +
            'hover:bg-button-secondary-hover hover:text-text-primary hover:border-0' +
            'active:bg-button-secondary-active active:text-text-primary active:border-0' +
            'disabled:border-button-secondary-disabled text-button-secondary-disabled',
        [ButtonVariant.tertiary]:
            'text-text-primary bg-button-tertiary-default' +
            'hover:bg-button-tertiary-hover' +
            'active:bg-button-tertiary-active' +
            'disabled:bg-button-tertiary-disabled',
        [ButtonVariant.shadow]:
            'text-text-accent bg-button-shadow-default' +
            'hover:bg-button-shadow-hover hover:text-ic-primary' +
            'active:bg-button-shadow-active hover:text-text-primary' +
            'disabled:bg-button-shadow-disabled text-text-tertiary',
    }

    const sizeStyleMap = {
        [ButtonSize.large]: 'h-[60px]',
        [ButtonSize.medium]: 'h-[52px]',
        [ButtonSize.small]: 'h-11',
    }

    return (
        <button
            onClick={onClick} disabled={disabled}
            className={`self-center text-[18px] duration-100 ${className} ${variantStyleMap[variant]} ${sizeStyleMap[size]}`}
        >
            {children}
        </button>
    );
};

export default Button;