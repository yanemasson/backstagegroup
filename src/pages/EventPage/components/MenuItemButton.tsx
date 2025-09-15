import {ReactNode} from "react";

interface MenuItemButtonProps {
    isActive: boolean;
    setActive: () => void;
    children: ReactNode;
}

const MenuItemButton = ({isActive, setActive, children}: MenuItemButtonProps) => {
    return (
        <div className='flex flex-col min-h-10 items-end w-fit' onClick={setActive}>
            <p className={`font-medium text-[18px] md:text-[24px] tracking-[0em] leading-none hover:cursor-pointer 
            ${!isActive ? 'text-gray' : ''} transition-colors duration-100 whitespace-nowrap`}
            >
                {children}
            </p>
        </div>
    );
};

export default MenuItemButton;