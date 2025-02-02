import {ReactNode} from "react";

interface AnchorProps {
    href: string,
    children: ReactNode
    target?: string
}

const Anchor = ({href, children, target = '_blank'}: AnchorProps) => {
    return (
        <a target={target} className='underline focus:text-yellow hover:text-yellow' href={href}>
            {children}
        </a>
    );
};

export default Anchor;