import {useEffect, useRef, useState} from "react";
import BurgerMenu from "./components/BurgerMenu.tsx";
import Text, {TextVariant} from "../../components/Text.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import Button, {ButtonSize, ButtonVariant} from "../../components/Buttons/Button.tsx";
import {useCity} from "../../hooks/geolocation/useCity.ts";
import CitySearchModal from "../../components/CitySearchModal.tsx";
import CityConfirmationModal from "../../components/CityConfirmationModal.tsx";
/*
import DesktopLogo from '../../assets/logos/logo_bg_full.svg?react';
*/
import BurgerIcon from '../../assets/icons/ic_burger.svg?react'
import {Link} from "react-router";
import LinkItem from "../../components/LinkItem.tsx";
import CitySelection from "./components/CitySelection.tsx";
import IconButton, {IconButtonSize, IconButtonVariant} from "../../components/Buttons/IconButton.tsx";
import {useActiveSection} from "../../hooks/useActiveSection.ts";
import {useLocation} from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [showCityPopUp, setShowCityPopUp] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const { selectedCity } = useCity();

    const [visible, setVisible] = useState(true);
    const visibleRef = useRef(visible);
    useEffect(() => {
        visibleRef.current = visible;
    }, [visible]);
    const location = useLocation();

    const activeSection = useActiveSection()
    const isTransparent = (activeSection === 'hero' && location.pathname === '/')

    const md = useMediaBreakpoint('md')
    const xl = useMediaBreakpoint('xl')


    const toggleMenu = () => {setIsOpen(!isOpen)}

    // управление скроллом
    useEffect(() => {
        const shouldDisableScroll = isOpen || isCityModalOpen;

        if (shouldDisableScroll) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = 'auto';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';

            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
        };
    }, [isOpen, isCityModalOpen]);

    // видимость навбара
    useEffect(() => {
        let ticking = false;
        let lastScrollY = 0;
        let hideTimeout: NodeJS.Timeout | null = null;

        const controlNavbar = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const scrollDelta = currentScrollY - lastScrollY;
                    const isScrollingDown = scrollDelta > 0;
                    const isScrollingUp = scrollDelta < 0;

                    if (hideTimeout) {
                        clearTimeout(hideTimeout);
                    }

                    if (isScrollingDown && visible && currentScrollY > 50) {
                        hideTimeout = setTimeout(() => {
                            setVisible(false);
                        }, 50);
                    }
                    else if (isScrollingUp && !visible) {
                        hideTimeout = setTimeout(() => {
                            setVisible(true);
                        }, 50);
                    }

                    if (currentScrollY < 50) {
                        if (hideTimeout) {
                            clearTimeout(hideTimeout);
                        }
                        setVisible(true);
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
        };
    }, [visible]);

    // геолокация
    const handleConfirmCity = () => {
        localStorage.setItem('hasVisited', 'true');
        setShowCityPopUp(false);

    };
    const handleChangeCity = () => {
        setShowCityPopUp(false);
        setIsCityModalOpen(true)
    };
    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
            const handleInteraction = () => {
                setHasUserInteracted(true);
                setShowCityPopUp(true);
                // Удаляем обработчики после первого взаимодействия
                ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
                    document.removeEventListener(event, handleInteraction);
                });
            };

            // Добавляем обработчики событий
            ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
                document.addEventListener(event, handleInteraction, { once: true });
            });

            // Показываем баннер через 10 секунд, даже если не было взаимодействия
            const timeoutId = setTimeout(() => {
                if (!hasUserInteracted) {
                    setShowCityPopUp(true);
                }
            }, 10000);

            return () => {
                clearTimeout(timeoutId);
                ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
                    document.removeEventListener(event, handleInteraction);
                });
            };
        }
    }, [hasUserInteracted, selectedCity]);

    return (
        <nav className={`fixed z-40 h-[76px] w-full flex justify-between items-center px-4 md:px-6 
            ${visible ? 'transform-none' : 'transform -translate-y-full'}
            ${isTransparent ? 'bg-transparent' : 'bg-bg-global'} transition-all duration-300 `}
        >

            <div className='flex items-center gap-3 md:gap-6'>
                {/*<Link to='/'>{xl ? <DesktopLogo /> : <MobileLogo />}</Link>*/}
                <Link to='/'>
                    {xl
                        ? <Text variant={TextVariant.Body_L}>БЭКСТЕЙДЖ | ЗА КУЛИСАМИ</Text>
                        : <Text variant={TextVariant.Body_L}>БГ</Text>
                    }

                </Link>
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