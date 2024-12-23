import BurgerButton from "./components/BurgerButton.tsx";
import {useState} from "react";
import {useActiveSection} from "../../hooks/useActiveSection.ts";
import BurgerMenu from "./components/BurgerMenu.tsx";
import Logo from "/src/assets/icons/logo.svg?react"
import LocationIcon from "/src/assets/icons/ic_location.svg?react"
import Button, {ButtonVariant} from "../../components/Button.tsx";
import Text, {TextVariant} from "../../components/Text.tsx";
import {NavLink} from "react-router";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const activeSection = useActiveSection()
    const MenuItems = [
        {id: '/', label: 'Главная'},
        {id: 'events', label: 'Концерты'}
    ]
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <nav className={`fixed flex items-center justify-between transition-all duration-300 z-40 w-full h-20 text-white px-5 lg:px-40 
            ${activeSection == 'hero' ? ( isOpen ? 'bg-black/80' : 'bg-transparent') : 'bg-black/80'}`}>
            <Logo/>
            <BurgerButton isOpen={isOpen} toggleMenu={toggleMenu}/>
            <BurgerMenu isOpen={isOpen}>
                <div className='flex lg:flex-row flex-col items-center justify-center gap-5'>
                    {MenuItems.map((item) =>
                        <NavLink
                            key={`#${item.id}`} to={`${item.id}`}
                            className={
                            `${activeSection === item.id ? 'text-white font-bold' : 'text-white'} 
                            hover:text-yellow transition-colors px-4 py-2`}>
                            <Text variant={TextVariant.P}>{item.label}</Text></NavLink>
                    )}
                    <Button variant={ButtonVariant.white}>
                        <div className='flex items-center justify-center gap-2 '>
                            <Text variant={TextVariant.P}>Красноярск</Text>
                            <LocationIcon/>
                        </div>
                    </Button>
                </div>
            </BurgerMenu>
        </nav>
    );
};

export default Header;