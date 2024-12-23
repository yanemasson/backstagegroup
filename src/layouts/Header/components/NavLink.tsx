import {ReactNode} from "react";
import Text, {TextVariant} from "../../../components/Text.tsx";

interface NavLinkProps {
    href: string;
    children: ReactNode;
    isActive: boolean;
}

const NavLink = ({ href, children, isActive }: NavLinkProps) => {
    return (
        <a href={href} className={`${isActive ? 'text-white font-bold' : 'text-white'} hover:text-yellow transition-colors px-4 py-2`}>
            <Text variant={TextVariant.P}>{children}</Text>
        </a>
    );
};

export default NavLink