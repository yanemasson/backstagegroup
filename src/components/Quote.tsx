import {ReactNode} from "react";

type QuoteProps = {
    children: ReactNode;
    className?: string;
};

const Quote = ({children, className}: QuoteProps) => {
    return (
        <div className={`border-solid border-x-divider-accent p-6 border-x-[2px] border-y-0 ${className}`}>
            {children}
        </div>
    );
};

export default Quote;