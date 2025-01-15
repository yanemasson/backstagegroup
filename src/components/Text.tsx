import {ReactNode} from "react";

export enum TextVariant {
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    P = 'P',
    B = 'B',
}

type TextProps = {
    children: ReactNode;
    variant: TextVariant;
};
const Text = ({children, variant}:TextProps) => {
    const variantStyleMap = {
        [TextVariant.H1]: 'lg:text-[52px] text-[40px] font-bold',
        [TextVariant.H2]: 'lg:text-[52px] text-[40px] font-bold',
        [TextVariant.H3]: 'text-[20px] font-normal',
        [TextVariant.P]: 'text-[20px] font-light',
        [TextVariant.B]: 'text-[20px] font-bold'
    };
    const Component = variant === TextVariant.P ? 'p'
        : variant === TextVariant.B ? 'strong'
            : variant.toLowerCase() as keyof JSX.IntrinsicElements;

    return (
        <Component className={variantStyleMap[variant]}>
            {children}
        </Component>
    );
};
export default Text;