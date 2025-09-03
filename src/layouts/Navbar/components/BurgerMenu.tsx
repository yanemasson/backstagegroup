import Button, {ButtonVariant} from "../../../components/Buttons/Button.tsx";
import CloseIcon from '../../../assets/icons/ic_close.svg?react'
import Text, {TextVariant} from "../../../components/Text.tsx";
import {Link} from "react-router";
import VKLogo from "../../../assets/icons/ic_vkontakte.svg?react";
import TelegramLogo from "../../../assets/icons/ic_telegram.svg?react";

type BurgerMenuProps = {
    isOpen: boolean
    onClose: () => void
}

const BurgerMenu = ({isOpen, onClose}: BurgerMenuProps) => {
    const menuStyle =  `flex items-start xl:items-center gap-5 text-white transition-all duration-300`

    return (
        <div className={`${menuStyle} bg-semi-darkgray h-full
            w-full px-[5vw] py-[62px] z-30 top-0  left-0 fixed flex-col items-start
            ${!isOpen && 'opacity-0 pointer-events-none'}`}>
            <div className='flex items-center justify-between gap-2 w-[90vw] pb-[30px]'>
                <Link onClick={onClose} to='/'>
                    <Button className='w-[83px] h-10 shrink-0' variant={ButtonVariant.disabled}>Афиша</Button>
                </Link>
                <div className=' bg-[#1F1E1E] text-dark-text min-w-[172px] h-10 w-full md:w-[736px] p-2 md:p-4'>

                </div>
                <Button onClick={onClose} className='flex w-10 h-10 shrink-0 items-center justify-center' variant={ButtonVariant.disabled}>
                    <CloseIcon/>
                </Button>
            </div>
            <div className='flex flex-col items-start gap-5 w-[90vw] mb-10'>
                <Text variant={TextVariant.CAPTION} className='text-lightgray'>Страницы</Text>
                <Link onClick={onClose} to='/news'>
                    <Text variant={TextVariant.H4} className='hover:cursor-pointer hover:text-light-brown '>
                        Новости
                    </Text>
                </Link>
                <Link onClick={onClose} to='/refund'>
                    <Text variant={TextVariant.H4} className='hover:cursor-pointer hover:text-light-brown '>
                        Возврат билетов
                    </Text>
                </Link>
            </div>
            <div className='flex flex-col items-start gap-5 w-[90vw] mb-10'>
                <Text variant={TextVariant.CAPTION} className='text-lightgray'>Контакты</Text>
                <a onClick={onClose} href='tel:+79232157634'>
                    <Text variant={TextVariant.H4} className='hover:cursor-pointer hover:text-light-brown '>
                        +7 923 215-76-34
                    </Text>
                </a>
            </div>
            <div className='flex flex-col items-start gap-5 w-[90vw] mb-10'>
                <Text variant={TextVariant.CAPTION} className='text-lightgray'>Наши соцсети</Text>
                <div className='flex gap-2 text-lightgray'>
                    <a target={'_blank'} href={'https://vk.com/backstagegroup'} className='flex items-center justify-center w-10 h-10 bg-[#1F1E1E] transition-colors duration-100 hover:text-[#0077ff]'><VKLogo/></a>
                    <a target={'_blank'} href={'https://t.me/backstagegroup24'} className='flex items-center justify-center w-10 h-10 bg-[#1F1E1E] transition-colors duration-100 hover:text-[#0088cc]'><TelegramLogo/></a>
                </div>
            </div>
        </div>
    );
};

export default BurgerMenu;