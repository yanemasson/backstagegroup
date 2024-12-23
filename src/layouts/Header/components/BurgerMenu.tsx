import {ReactNode} from "react";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import {useActiveSection} from "../../../hooks/useActiveSection.ts";

type BurgerMenuProps = {
    children: ReactNode
    isOpen: boolean
}

const BurgerMenu = ({children, isOpen}: BurgerMenuProps) => {
    const activeSection = useActiveSection()
    const lg = useMediaBreakpoint('lg')
    const menuStyle =  `flex items-center text-white transition-all duration-300 `
    if(lg) {
        return (
            <div className={`${menuStyle} `}>
                {children}
            </div>
        )
    }
    return (
        <div className={`${menuStyle} 
        ${activeSection === 'hero' ? ( isOpen ? 'bg-black/80' : 'bg-transparent') : 'bg-black/80'}
            w-full p-10 z-30 top-20 left-0 fixed flex-col gap-10
            ${!isOpen && 'opacity-0 pointer-events-none'}`}>
            {children}
        </div>
    );
};

export default BurgerMenu;