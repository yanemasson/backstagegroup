import { ReactNode} from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;

export enum TextVariant {
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    H4 = 'H4',
    P = 'P',
    B = 'B',
    CAPTION = 'CAPTION'
}

type TextProps = {
    children: ReactNode;
    variant: TextVariant;
    className?: string;
};
const Text = ({children, variant, className}:TextProps) => {
    const variantStyleMap = {
        [TextVariant.H1]: 'font-display font-semibold text-[36px] xl:text-[60px] tracking-[0.07em] leading-none',
        [TextVariant.H2]: 'font-display font-semibold text-[28px] xl:text-[40px] tracking-[0.07em] leading-none',
        [TextVariant.H3]: 'font-display font-medium text-[24px] xl:text-[32px] tracking-[0.07em] leading-none',
        [TextVariant.H4]: 'font-medium text-[18px] xl:text-[24px] tracking-[0em] leading-none',
        [TextVariant.P]: 'text-[16px] xl:text-[18px] font-light tracking-[0em] leading-tight',
        [TextVariant.B]: 'xl:text-[20px] text-[16px] font-bold',
        [TextVariant.CAPTION]: 'text-[16px] font-light',
    };
    const Component = (variant === TextVariant.P || variant === TextVariant.CAPTION) ? 'p'
        : variant === TextVariant.B ? 'strong'
            : variant.toLowerCase() as keyof IntrinsicElements;

    return (
        <Component className={`${variantStyleMap[variant]} ${className}`}>
            {children}
        </Component>
    );
};
export default Text;