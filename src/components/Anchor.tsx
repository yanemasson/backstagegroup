import {ReactNode} from "react";

interface AnchorProps {
    href: string,
    children: ReactNode
    target?: string
}

const Anchor = ({href, children, target = '_blank'}: AnchorProps) => {
    return (
        <a
            target={target}
            className='underline text-text-accent hover:text-button-primary-hover active:text-button-primary-active'
            href={href}
        >
            {children}
        </a>
    );
};

export default Anchor;