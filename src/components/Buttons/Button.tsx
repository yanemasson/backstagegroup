import {ReactNode} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonVariant {
    yellow = 'yellow',
    white = 'white',
    outline = 'outline'
}
interface ButtonProps {
    children: ReactNode,
    variant?: ButtonVariant
    onClick?: () => void
}
const Button = ({children, onClick, variant = ButtonVariant.white} : ButtonProps) => {
    const variantStyleMap = {
        [ButtonVariant.white]: 'text-black bg-white active:bg-white/70 hover:bg-[#FFFFFF]',
        [ButtonVariant.yellow]: 'text-white bg-yellow active:bg-black/70',
        [ButtonVariant.outline]: 'border-solid border border-2 text-white hover:border-yellow hover:text-yellow'
    }
    return (
        <button
            className={`self-center rounded-full duration-200 hover:shadow-lg py-2 min-w-44 lg:min-w-40
            ${variantStyleMap[variant]}`} onClick={()=> onClick} >{children}</button>
    );
};

export default Button;