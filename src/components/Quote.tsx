import {ReactNode} from "react";

type QuoteProps = {
    children: ReactNode;
    className?: string;
};

const Quote = ({children, className}: QuoteProps) => {
    return (
        <div className={`border-solid border-x-light-brown px-[30px] py-2.5 border-x-[2px] border-y-0 ${className}`}>
            {children}
        </div>
    );
};

export default Quote;