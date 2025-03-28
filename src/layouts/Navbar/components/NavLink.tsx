import {ReactNode} from "react";

interface NavLinkProps {
    href: string;
    children: ReactNode;
    isActive: boolean;
    onClick?: () => void;
}

const NavLink = ({href, children, isActive, onClick}: NavLinkProps) => {
    return (
        <a
            onClick={onClick}
            className={` ${isActive ? 'text-white' : 'text-lightgray'} hover:text-white transition-colors py-2`}
            href={href}>
            {children}
        </a>
    );
};

export default NavLink;