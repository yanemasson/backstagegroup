import {ReactNode} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonVariant {
    primary = 'primary',
    secondary = 'secondary',
    outline = 'outline'
}
interface ButtonProps {
    children: ReactNode,
    variant?: ButtonVariant
    onClick?: () => void
    disabled?: boolean
    className?: string
}
const Button = ({
                    children,
                    variant = ButtonVariant.primary,
                    onClick,
                    disabled = false,
                    className} : ButtonProps) => {

    const variantStyleMap = {
        [ButtonVariant.primary]: 'bg-light-brown text-white hover:bg-white hover:text-light-brown active:bg-black disabled:bg-[#131313] disabled:text-[#3E3E3E]',
        [ButtonVariant.secondary]: 'bg-semi-darkgray text-white hover:bg-black active:bg-brown',
        [ButtonVariant.outline]: 'text-light-brown border-solid border-[2px] border-light-brown hover:bg-black active:bg-gray ',
    }

    return (
        <button
            onClick={onClick} disabled={disabled}
            className={`self-center text-[18px] duration-200 ${className} ${variantStyleMap[variant]}`}
        >
            {children}
        </button>
    );
};

export default Button;