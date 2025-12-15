import {useEffect, useState} from "react";
import BurgerMenu from "./components/BurgerMenu.tsx";
import Text, {TextVariant} from "../../components/Text.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import Button, {ButtonSize, ButtonVariant} from "../../components/Buttons/Button.tsx";
import {useCity} from "../../hooks/geolocation/useCity.ts";
import {CitySearchModal} from "./components/CitySearchModal.tsx";
import CityConfirmationModal from "../../components/CityConfirmationModal.tsx";
import DesktopLogo from '../../assets/logos/logo_bg_full.svg?react';
import MobileLogo from '../../assets/logos/logo_bg.svg?react'
import BurgerIcon from '../../assets/icons/ic_burger.svg?react'
import {Link} from "react-router";
import LinkItem from "../../components/LinkItem.tsx";
import CitySelection from "./components/CitySelection.tsx";
import IconButton, {IconButtonSize, IconButtonVariant} from "../../components/Buttons/IconButton.tsx";


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const md = useMediaBreakpoint('md')
    const toggleMenu = () => {setIsOpen(!isOpen)}

    useEffect(() => {
        if (isOpen && !md) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, md]);

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

    //геолокация
    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [showCityPopUp, setShowCityPopUp] = useState(false);
    const { selectedCity } = useCity();
    const handleConfirmCity = () => {
        localStorage.setItem('hasVisited', 'true');
        setShowCityPopUp(false);
    };
    const handleChangeCity = () => {
        setShowCityPopUp(false);
        setIsCityModalOpen(true)
    };
    useEffect(() => {
        // Проверяем, первый ли это визит
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
            setShowCityPopUp(true);
        }
    }, [selectedCity]);

    return (
        <nav className={`fixed z-40 h-[76px] w-full flex justify-between items-center px-4 md:px-6 
            ${visible ? 'transform-none' : 'transform -translate-y-full'} transition-all duration-300 `}>

            <div className='flex items-center gap-3 md:gap-6'>
                <Link to='/'>{md ? <DesktopLogo /> : <MobileLogo />}</Link>
                <CitySelection city={selectedCity} onClick={() => setIsCityModalOpen(true)}/>
            </div>

            {md  &&
                <div className='flex items-center gap-6'>
                    <LinkItem to='/news'>Новости</LinkItem>
                    <LinkItem to='/refund'>Возврат билетов</LinkItem>
                </div>
            }

            <div className='flex items-center gap-2 md:gap-6'>
                {md && <Text variant={TextVariant.Body_S}>+7 999 440-02-49</Text>}
                <Link to='/events'>
                    <Button className='shrink-0 w-[95px]' variant={ButtonVariant.secondary} size={ButtonSize.small}>
                        Афиша
                    </Button>
                </Link>
                {!md &&
                    <>
                        <IconButton
                            variant={IconButtonVariant.FilledSecondary}
                            size={IconButtonSize.small}
                            onClick={() => toggleMenu()}
                        >
                            <BurgerIcon/>
                        </IconButton>
                        <BurgerMenu isOpen={isOpen} onClose={toggleMenu}/>
                    </>
                }
            </div>

            {showCityPopUp && (
                <CityConfirmationModal
                    city={selectedCity}
                    onConfirm={handleConfirmCity}
                    onChangeCity={handleChangeCity}
                />
            )}
            <CitySearchModal
                isOpen={isCityModalOpen}
                onClose={() => setIsCityModalOpen(false)}
            />
        </nav>
    );
};

export default Navbar;