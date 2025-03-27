import {ReactNode} from "react";

interface AnchorProps {
    href: string,
    children: ReactNode
    target?: string
}

const Anchor = ({href, children, target = '_blank'}: AnchorProps) => {
    return (
        <a target={target} className='underline text-lightgray focus:text-white hover:text-white' href={href}>
            {children}
        </a>
    );
};

export default Anchor;