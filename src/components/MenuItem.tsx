import {ReactNode} from "react";

interface MenuItemProps {
    children: ReactNode
    isActive?: boolean
    onClick?: () => void
}

const MenuItem = ({children, isActive, onClick}: MenuItemProps) => {
    return (
        <div onClick={onClick}
            className={`w-[44vw] md:w-[22vw] h-11 transition-colors duration-200 flex items-center justify-center
             active:bg-brown ${isActive ? 'bg-brown' : 'bg-gray'}`}>
            {children}
        </div>
    );
};

export default MenuItem;