import {ReactNode} from "react";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";

type BurgerMenuProps = {
    children: ReactNode
    isOpen: boolean
}

const BurgerMenu = ({children, isOpen}: BurgerMenuProps) => {
    const xl = useMediaBreakpoint('xl')
    const menuStyle =  `flex items-start xl:items-center gap-5 text-white transition-all duration-300`
    if(xl) {
        return (
            <div className={`${menuStyle} `}>
                {children}
            </div>
        )
    }
    return (
        <div className={`${menuStyle} bg-darkgray h-full
            w-full px-[5vw] py-10 z-30 top-[64px] xl:top-[84px] left-0 fixed flex-col
            ${!isOpen && 'opacity-0 pointer-events-none'}`}>
            {children}
        </div>
    );
};

export default BurgerMenu;