/// <reference types="vite-plugin-svgr/client" />
import Text, {TextVariant} from "../../components/Text.tsx";
import TelegramLogo from '/src/assets/icons/ic_telegram.svg?react'
import VKLogo from '/src/assets/icons/ic_vkontakte.svg?react'

const Footer = () => {
    return (
        <section className='text-white flex flex-col lg:flex-row gap-5 lg:justify-between p-5 lg:px-20 bg-black z-30'>
            <div>
                <Text variant={TextVariant.P}>Организатор: ИП Волик Михаил Александрович</Text>
                <Text variant={TextVariant.P}>Адрес: 662313, Красноярский край, г. Шарыпово, мкр. 4-й</Text>
                <Text variant={TextVariant.P}>ИНН: 245904917048</Text>
                <Text variant={TextVariant.P}>ОГРН/ОРГНИП: 323246800154125</Text>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <Text variant={TextVariant.B}>Мы в социальных сетях:</Text>
                <div className='flex gap-6 p-4 justify-center'>
                    <a target="_blank" className='hover:text-[#0077FF] flex items-center justify-center' href={'https://vk.com/backstagegroup'}><VKLogo/></a>
                    <a target="_blank" className='hover:text-[#2AABEE] flex items-center justify-center' href={'https://t.me/backstagegroup24'}><TelegramLogo/></a>
                </div>
            </div>
        </section>
    );
};

export default Footer;