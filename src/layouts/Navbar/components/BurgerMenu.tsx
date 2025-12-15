import Text, {TextVariant} from "../../../components/Text.tsx";
import {Link} from "react-router";
import IconButton, {IconButtonSize, IconButtonVariant} from "../../../components/Buttons/IconButton.tsx";
import CloseIcon from "../../../assets/icons/ic_close.svg?react";
import VKLogo from "../../../assets/logos/logo_vk.svg?react";
import TelegramLogo from "../../../assets/logos/logo_telegram.svg?react";

type BurgerMenuProps = {
    isOpen: boolean
    onClose: () => void
}

const BurgerMenu = ({isOpen, onClose}: BurgerMenuProps) => {

    const MenuItems = [
        {
            title: "Главная страница",
            href: "/"
        },
        {
            title: "Афиша",
            href: "/events"
        },
        {
            title: "Новости",
            href: "/news"
        },
        {
            title: "Возврат билетов",
            href: "/refund"
        },
    ]

    return (
        <div
            className={`bg-bg-island h-full w-full z-30 top-0 left-0 fixed p-4 flex flex-col justify-between
            ${!isOpen && 'opacity-0 pointer-events-none'}`}
        >
            <div className='flex items-start justify-between '>
                <div>
                    <Text className='h-8 text-text-tertiary' variant={TextVariant.Body_M}>Страницы</Text>
                    {MenuItems.map((item) => (
                        <Link to={item.href} key={item.href}>
                            <Text className='h-10 py-2.5' variant={TextVariant.Subtitle_M}>{item.title}</Text>
                        </Link>
                    ))}
                </div>
                <IconButton onClick={onClose} variant={IconButtonVariant.FilledSecondary}><CloseIcon/></IconButton>
            </div>

            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <Text className='text-text-tertiary' variant={TextVariant.Body_M}>Контакты</Text>
                    <a href="tel:+79994400249"><Text className='h-10 py-2.5' variant={TextVariant.Subtitle_M}>+7 999 440-02-49</Text></a>

                </div>


                <div className='flex flex-col gap-2'>
                    <Text className='text-text-tertiary' variant={TextVariant.Body_M}>Наши соцсети</Text>
                    <div className='flex gap-1'>
                        <a target={'_blank'} href={'https://vk.com/backstagegroup'}>
                            <IconButton size={IconButtonSize.small} variant={IconButtonVariant.NoFilledTertiary}>
                                <VKLogo/>
                            </IconButton>
                        </a>
                        <a target={'_blank'} href={'https://t.me/backstagegroup24'}>
                            <IconButton size={IconButtonSize.small} variant={IconButtonVariant.NoFilledTertiary}>
                                <TelegramLogo/>
                            </IconButton>
                        </a>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default BurgerMenu;