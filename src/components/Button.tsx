import {ReactNode} from "react";

export enum ButtonVariant {
    yellow = 'yellow',
    white = 'white',
    outline = 'outline'
}
interface ButtonProps {
    children: ReactNode,
    variant?: ButtonVariant
}
const Button = ({children, variant = ButtonVariant.white} : ButtonProps) => {
    const variantStyleMap = {
        [ButtonVariant.white]: 'text-black bg-white active:bg-white/70',
        [ButtonVariant.yellow]: 'text-white bg-yellow active:bg-black/70',
        [ButtonVariant.outline]: 'border-solid border border-2 text-white'
    }
    return (
        <button className={`self-center rounded-full duration-200 hover:shadow-lg py-2 min-w-44 lg:min-w-40 ${variantStyleMap[variant]}`} >{children}</button>
    );
};

export default Button;