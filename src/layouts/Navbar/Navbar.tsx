import {useEffect, useState} from "react";
import BurgerButton from "./components/BurgerButton.tsx";
import BurgerMenu from "./components/BurgerMenu.tsx";
import Text, {TextVariant} from "../../components/Text.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import Button, {ButtonVariant} from "../../components/Buttons/Button.tsx";
import SearchBar from "./components/SearchBar.tsx";
import {useCity} from "../../hooks/geolocation/useCity.ts";
import {CitySearchModal} from "./components/CitySearchModal.tsx";
import CityConfirmationModal from "../../components/CityConfirmationModal.tsx";
import LocationIcon from '../../assets/icons/ic_location.svg?react'
import {Link} from "react-router";

const Navbar = () => {

    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [showCityPopUp, setShowCityPopUp] = useState(false);
    const { selectedCity} = useCity();

    const [isOpen, setIsOpen] = useState(false)
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const md = useMediaBreakpoint('md')

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
    
    return (
        <nav className={`bg-darkgray fixed z-40 w-full  py-5 flex items-center justify-center
            ${visible ? 'transform-none' : 'transform -translate-y-full'} transition-all duration-300 `}>
            <div className='relative flex flex-col gap-4 items-center justify-center md:w-[1166px]'>
                <div className='flex justify-between items-center w-[90vw] xl:w-[1166px]'>
                    {!md && <p className='text-[24px] whitespace-nowrap leading-[110%] tracking-normal'>BG</p>}

                    <div onClick={() => setIsCityModalOpen(true)}>
                        <Text className='flex gap-2 hover:cursor-pointer hover:text-light-brown' variant={TextVariant.P}>
                            <LocationIcon/>
                            {selectedCity}
                        </Text>
                    </div>
                    {md &&
                        <>
                            <div className='flex items-center gap-[30px]'>
                                <Link to='/news'>
                                    <Text variant={TextVariant.P} className='hover:cursor-pointer hover:text-light-brown '>
                                        Новости
                                    </Text>
                                </Link>
                                <Link to='/refund'>
                                    <Text variant={TextVariant.P} className='hover:cursor-pointer hover:text-light-brown '>
                                        Возврат билетов
                                    </Text>
                                </Link>
                            </div>
                            <a className='cursor-pointer hover:text-light-brown' href='tel:+79232157634'><Text variant={TextVariant.P}>+7 923 215-76-34</Text></a>

                        </>}
                </div>


                <div className='flex items-center justify-between gap-2 w-[90vw] xl:w-[1166px]'>
                    <Link to='/'>
                        <Button className='w-[83px] h-10 md:w-[136px] md:h-[53px] shrink-0' variant={ButtonVariant.outline}>
                            Афиша
                        </Button>
                    </Link>
                    {md && <p className='text-[24px] whitespace-nowrap leading-[110%] tracking-normal'>BACKSTAGE GROUP</p>}

                    <SearchBar/>
                    {!md &&
                        <>
                            <BurgerButton toggleMenu={toggleMenu}/>
                            <BurgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)}/>
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
            </div>

        </nav>
    );
};

export default Navbar;