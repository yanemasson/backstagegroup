import {useState} from "react";
import {useActiveSection} from "../../hooks/useActiveSection.ts";
import BurgerButton from "./components/BurgerButton.tsx";
import BurgerMenu from "./components/BurgerMenu.tsx";
import Text, {TextVariant} from "../../components/Text.tsx";
import Logo from "/src/assets/icons/logo.svg?react"
import {Link, NavLink} from "react-router";

const Header = () => {
/*  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
    const [showCityPopUp, setShowCityPopUp] = useState(false;
    const {selectedCity} = useCity();
*/
    const [isOpen, setIsOpen] = useState(false)
    const activeSection = useActiveSection()
    const MenuItems = [
        {id: '/', label: 'Главная'},
        {id: 'events', label: 'Концерты'},
        {id: 'refund', label: 'Возврат билетов'}
        // {id: 'about', label: 'О нас'}
    ]
/*
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
    */
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className={`fixed flex items-center justify-between transition-all duration-300 z-40 w-full h-20 text-white px-5 lg:px-40 
            ${activeSection == 'hero' ? ( isOpen ? 'bg-black/80' : 'bg-transparent') : 'bg-black/80'}`}>
            <Link to={'/'}><Logo/></Link>
            <BurgerButton isOpen={isOpen} toggleMenu={toggleMenu}/>
            <BurgerMenu isOpen={isOpen}>
                <div className='flex lg:flex-row flex-col items-center justify-center gap-5'>
                    {MenuItems.map((item) =>
                        <NavLink
                            onClick={toggleMenu}
                            key={`#${item.id}`} to={`${item.id}`}
                            className='hover:text-yellow transition-colors px-4 py-2'>
                            <Text variant={TextVariant.P}>{item.label}</Text></NavLink>
                    )}
{/*                    <Button variant={ButtonVariant.white}  >
                        <div onClick={() => setIsCityModalOpen(true)} className='flex items-center justify-center gap-2 px-4 ' >
                            <Text variant={TextVariant.P}>{selectedCity}</Text>
                            <LocationIcon/>
                        </div>
                    </Button>*/}
                </div>
            </BurgerMenu>
           {/* <CityModal
                isOpen={isCityModalOpen}
                onClose={() => setIsCityModalOpen(false)}
            />
            {showCityPopUp && (
                <CityConfirmationModal
                    city={selectedCity}
                    onConfirm={handleConfirmCity}
                    onChangeCity={handleChangeCity}
                />
            )}*/}
        </nav>
    );
};

export default Header;