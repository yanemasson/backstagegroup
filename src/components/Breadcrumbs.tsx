import Text, {TextVariant} from "./Text.tsx";
import {ReactNode} from "react";
import RightIcon from '../assets/icons/arrows/ic_right.svg?react'
import {Link} from "react-router";

interface BreadcrumbsProps {
    children: ReactNode;
    isFirst?: boolean;
    isLast?: boolean;
    to?: string;
}

const Breadcrumbs = ({children, isFirst = false, isLast = false, to} : BreadcrumbsProps) => {
    return (
        <Link
            to={to ? to : ''}
            className={`flex text-center items-center
            ${isLast 
                ? 'text-text-primary' 
                : 'text-text-tertiary hover:text-button-primary-hover active:text-button-primary-active'
            }
            ${!to && 'cursor-default'}`
        }>
            {!isFirst && (<RightIcon/>)}
            <Text variant={TextVariant.Body_S}>
                {children}
            </Text>
        </Link>

    );
};

export default Breadcrumbs;