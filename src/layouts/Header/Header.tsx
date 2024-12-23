import BurgerButton from "./components/BurgerButton.tsx";
import {useState} from "react";
import {useActiveSection} from "../../hooks/useActiveSection.ts";
import NavLink from "./components/NavLink.tsx";
import BurgerMenu from "./components/BurgerMenu.tsx";
import Logo from "/src/assets/icons/logo.svg?react"
import Button, {ButtonVariant} from "../../components/Button.tsx";
import Text, { TextVariant} from "../../components/Text.tsx";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const activeSection = useActiveSection()
    const MenuItems = [
        {id: 'main', label: 'Главная'},
        {id: 'concerts', label: 'Концерты'}
    ]
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <nav className={`fixed flex items-center justify-between transition-all duration-300 z-30 w-full h-20 text-white px-5 lg:px-40 
            ${activeSection === 'hero' ? ( isOpen ? 'bg-black' : 'bg-transparent') : 'bg-black'}`}>
            <Logo/>
            <BurgerButton isOpen={isOpen} toggleMenu={toggleMenu}/>
            <BurgerMenu isOpen={isOpen}>
                <div className='flex lg:flex-row flex-col items-center justify-center gap-5'>
                    {MenuItems.map((item) =>
                        <NavLink key={`#${item.id}`} href={`#${item.id}`} isActive={activeSection === item.id}>{item.label}</NavLink>
                    )}
                    <Button variant={ButtonVariant.white}><Text variant={TextVariant.H3}>Красноярск</Text></Button>
                </div>
            </BurgerMenu>
        </nav>
    );
};

export default Header;