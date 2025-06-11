import {useEffect, useState} from "react";
import BurgerButton from "./components/BurgerButton.tsx";
import BurgerMenu from "./components/BurgerMenu.tsx";
import Text, {TextVariant} from "../../components/Text.tsx";
import LogoMobile from "/src/assets/icons/logo_mobile.svg?react"
import LogoDesktop from "/src/assets/icons/logo_desktop.svg?react"
import NavLink from "./components/NavLink.tsx";
import {useActiveSection} from "../../hooks/useActiveSection.ts";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import {useLocation} from "react-router-dom";
import {Link} from "react-router";

const Navbar = () => {


    const [isOpen, setIsOpen] = useState(false)
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const isActive = useActiveSection()
    const xl = useMediaBreakpoint('xl')
    const location = useLocation();

    const MenuItems = [
        {id: 'hero', label: location.pathname === '/' ? 'Начало' : 'О концерте'},
        {id: 'eventlist', label: 'Афиша'},
        {id: 'about', label: 'Организаторы'},
        {id: 'reviews', label: 'Отзывы'},
    ]

    const toggleMenu = () => {setIsOpen(!isOpen)}

    useEffect(() => {
        if (isOpen && !xl) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, xl]);

    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {setVisible(false);} else {setVisible(true);}
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', controlNavbar);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);
    
    return (
        <nav className={`bg-darkgray fixed flex items-center justify-center z-40 w-full h-[64px] xl:h-[84px]
            ${visible ? 'transform-none' : 'transform -translate-y-full'}  transition-all duration-300`}>
            <div className='flex justify-between w-[90vw] xl:w-[1166px]'>
                <Link className='flex gap-[15px]' to="/">
                    {xl ? <LogoDesktop /> : <LogoMobile />}
                    <Text variant={TextVariant.CAPTION}>Концертное<br/>агенство</Text>
                </Link>
                <BurgerButton isOpen={isOpen} toggleMenu={toggleMenu}/>
                <BurgerMenu isOpen={isOpen}>
                    <div className='flex flex-col items-start xl:flex-row xl:items-center gap-5'>
                        {MenuItems.map((item) =>
                            <NavLink onClick={toggleMenu} isActive={isActive === item.id} key={`#${item.id}`} href={`#${item.id}`}>
                                <Text variant={TextVariant.CAPTION}>{item.label}</Text>
                            </NavLink>
                        )}
                    </div>
                    {!xl &&
                        <div className='pt-[45px]'>
                            <Text variant={TextVariant.CAPTION}>+7 (987) 487-87-76</Text>
                            <Text className='text-lightgray' variant={TextVariant.CAPTION}>пн-пт 9:00 по 21:00</Text>
                        </div>
                    }
                </BurgerMenu>
                {xl &&
                    <div>
                        <Text variant={TextVariant.CAPTION}>+7 (987) 487-87-76</Text>
                        <Text className='text-lightgray' variant={TextVariant.CAPTION}>пн-пт 9:00 по 21:00</Text>
                    </div>
                }
            </div>
        </nav>
    );
};

export default Navbar;