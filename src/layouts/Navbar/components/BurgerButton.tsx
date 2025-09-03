
interface BurgerButtonProps {
    toggleMenu?: () => void;
}

const BurgerButton = ({toggleMenu }: BurgerButtonProps)  => {

    return (
        <button
            id='menu-button'
            aria-expanded="false"
            aria-controls="menu-container-id"
            aria-label="Открыть меню"
            onClick={toggleMenu}
            className={`flex flex-col gap-1.5 justify-center items-start lg:hidden h-10 w-10 bg-semi-darkgray px-2.5 py-[15px]`}
        >
            <div className='border-solid border-[#8F8F8F] border-[2px] w-5'/>
            <div className='border-solid border-[#8F8F8F] border-[2px] w-2.5 '/>
        </button>
    );
};

export default BurgerButton;