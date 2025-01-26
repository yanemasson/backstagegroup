import {ReactNode} from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;

export enum TextVariant {
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    P = 'P',
    B = 'B',
    CAPTION = 'CAPTION'
}

type TextProps = {
    children: ReactNode;
    variant: TextVariant;
};
const Text = ({children, variant}:TextProps) => {
    const variantStyleMap = {
        [TextVariant.H1]: 'lg:text-[52px] text-[40px] font-bold',
        [TextVariant.H2]: 'lg:text-[50px] text-[22px] font-bold',
        [TextVariant.H3]: 'lg:text-[20px] text-[16px] font-normal',
        [TextVariant.P]: 'lg:text-[20px] text-[16px] font-light',
        [TextVariant.B]: 'lg:text-[20px] text-[16px] font-bold',
        [TextVariant.CAPTION]: 'lg:text-[16px] text-[12px] font-light',
    };
    const Component = (variant === TextVariant.P || variant === TextVariant.CAPTION) ? 'p'
        : variant === TextVariant.B ? 'strong'
            : variant.toLowerCase() as keyof IntrinsicElements;

    return (
        <Component className={variantStyleMap[variant]}>
            {children}
        </Component>
    );
};
export default Text;