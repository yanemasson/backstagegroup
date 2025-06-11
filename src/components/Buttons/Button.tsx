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
    className?: string
}
const Button = ({children, onClick, className, variant = ButtonVariant.primary} : ButtonProps) => {
    const variantStyleMap = {
        [ButtonVariant.primary]: 'bg-light-brown text-white hover:bg-white hover:text-light-brown active:bg-black',
        [ButtonVariant.secondary]: 'bg-gray text-white hover:bg-black active:bg-brown',
        [ButtonVariant.outline]: 'text-light-brown border-solid border-[2px] border-light-brown hover:bg-black active:bg-gray ',
    }
    return (
        <button
            className={`self-center text-[18px] duration-200 ${className} 
            ${variantStyleMap[variant]}`} onClick={()=> onClick} >{children}</button>
    );
};

export default Button;