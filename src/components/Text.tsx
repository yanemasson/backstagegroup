import {ReactNode} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum TextVariant {
    H1 = 'H1',
    H2 = 'H2',
    H3 = 'H3',
    H4 = 'H4',
    H5 = 'H5',

    Number_L = 'Number_L',
    Number_M = 'Number_M',
    Number_S = 'Number_S',
    Number_XS = 'Number_XS',
    Number_2XS = 'Number_2XS',

    Subtitle_L = 'Subtitle_L',
    Subtitle_M = 'Subtitle_M',
    Subtitle_S = 'Subtitle_S',

    Body_L = 'Body_L',
    Body_M = 'Body_M',
    Body_S = 'Body_S',

    Button_M = 'Button_M',
    Button_S = 'Button_S',

    Overline = 'Overline',

    Checkbox_L = 'Checkbox_L',
    Checkbox_M = 'Checkbox_M',
    Checkbox_S = 'Checkbox_S',

}

type TextProps = {
    children: ReactNode;
    variant: TextVariant;
    className?: string;
};
const Text = ({children, variant, className}:TextProps) => {
    const variantStyleMap = {
        [TextVariant.H1]:
            'font-display font-semibold text-[32px] leading-[40px] tracking-[0.07em] ' +
            'md:text-[52px] md:leading-[64px] md:tracking-wider',
        [TextVariant.H2]:
            'font-display font-semibold text-[32px] leading-[40px] tracking-[0.07em]' +
            'md:text-[42px] md:leading-[52px] md:tracking-wider',
        [TextVariant.H3]:
            'font-display font-semibold text-[24px] leading-[28px] tracking-[0.07em]' +
            'md:text-[32px] md:leading-[40px] md:tracking-[0.07em]',
        [TextVariant.H4]: 'font-display font-semibold text-[24px] leading-[28px] tracking-[0.07em]',
        [TextVariant.H5]: 'font-display font-semibold text-[18px] leading-[24px] tracking-[0.07em]',

        [TextVariant.Number_L]: 'font-display font-semibold text-[52px] leading-[52px] tracking-wider',
        [TextVariant.Number_M]: 'font-display font-semibold text-[42px] leading-[42px] tracking-wider',
        [TextVariant.Number_S]: 'font-display font-semibold text-[32px] leading-[32px] tracking-[0.07em]',
        [TextVariant.Number_XS]: 'font-display font-semibold text-[24px] leading-[24px] tracking-[0.07em]',
        [TextVariant.Number_2XS]: 'font-display font-semibold text-[18px] leading-[18px] tracking-[0.07em]',

        [TextVariant.Subtitle_L]: 'font-semibold text-[24px] leading-[28px] tracking-[0.02em]',
        [TextVariant.Subtitle_M]: 'font-semibold text-[18px] leading-[24px] tracking-[0.04em]',
        [TextVariant.Subtitle_S]: 'font-semibold text-[14px] leading-[20px] tracking-[0.04em]',

        [TextVariant.Body_L]: 'font-normal text-[18px] leading-[28px] tracking-normal',
        [TextVariant.Body_M]: 'font-normal text-[16px] leading-[24px] tracking-normal',
        [TextVariant.Body_S]: 'font-normal text-[14px] leading-[20px] tracking-normal',

        [TextVariant.Button_M]: 'font-medium text-[18px] leading-[24px] tracking-normal',
        [TextVariant.Button_S]: 'font-medium text-[16px] leading-[20px] tracking-normal',

        [TextVariant.Overline]: 'font-medium text-[12px] leading-[16px] tracking-[0.02em]',

        [TextVariant.Checkbox_L]: 'font-normal text-[16px] leading-[24px] tracking-normal',
        [TextVariant.Checkbox_M]: 'font-normal text-[14px] leading-[20px] tracking-normal',
        [TextVariant.Checkbox_S]: 'font-normal text-[14px] leading-[18px] tracking-normal',
    };

    return (
        <p className={`${variantStyleMap[variant]} ${className}`}>
            {children}
        </p>
    );
};
export default Text;