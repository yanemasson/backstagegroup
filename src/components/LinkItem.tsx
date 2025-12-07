import Text, {TextVariant} from "./Text.tsx";
import {ReactNode} from "react";
import {Link} from "react-router";

interface LinkItemProps {
    children: ReactNode;
    to: string;
    className?: string;
}

const LinkItem = ({children, to, className}: LinkItemProps) => {
    return (
        <Link to={to}>
            <Text
                variant={TextVariant.Body_S}
                className={`${className} hover:text-button-primary-hover active:text-button-primary-active active:underline`}
            >
                {children}
            </Text>
        </Link>

    );
};

export default LinkItem;