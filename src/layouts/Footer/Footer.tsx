/// <reference types="vite-plugin-svgr/client" />
import Text, {TextVariant} from "../../components/Text.tsx";
import TelegramLogo from '/src/assets/icons/ic_telegram.svg?react'
import VKLogo from '/src/assets/icons/ic_vkontakte.svg?react'
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import { Link } from "react-router";

const Footer = () => {
    const md = useMediaBreakpoint('md')

    return (
        <section className='flex flex-col gap-10 w-[90vw] md:w-[1167px] md:items-center pb-[100px]'>
            {md
                ? <div className='flex flex-col md:flex-row md:justify-between md:w-[970px] gap-[50px]'>

                    <div className='flex flex-col gap-5'>
                        <Text variant={TextVariant.H4}>Меню</Text>
                        <Link to={'/'}>
                            <Text variant={TextVariant.P} className='text-dark-text hover:text-light-brown'>Афиша</Text>
                        </Link>
                        <Link to={'/news'}>
                            <Text variant={TextVariant.P} className='text-dark-text hover:text-light-brown'>Новости</Text>
                        </Link>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <Text variant={TextVariant.H4}>Полезное</Text>
                        <Link to='/refund'>
                            <Text variant={TextVariant.P} className='text-dark-text hover:text-light-brown'>Возврат билетов</Text>
                        </Link>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <Text variant={TextVariant.H4}>Номера для связи</Text>
                        <a href='tel:+79994400249'>
                            <Text variant={TextVariant.P} className='text-dark-text hover:text-light-brown'>+7 999 440-02-49</Text>
                        </a>
                        <a href='tel:+79232157634'>
                            <Text variant={TextVariant.P} className='text-dark-text hover:text-light-brown'>+7 923 215-76-34</Text>
                        </a>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <Text variant={TextVariant.H4}>Мы в соцсетях</Text>
                        <div className='flex gap-2'>
                            <a target={'_blank'} href={'https://vk.com/backstagegroup'} className='flex items-center justify-center w-10 h-10 bg-[#131212] transition-colors duration-100 hover:text-[#0077ff]'><VKLogo/></a>
                            <a target={'_blank'} href={'https://t.me/backstagegroup24'} className='flex items-center justify-center w-10 h-10 bg-[#131212] transition-colors duration-100 hover:text-[#0088cc]'><TelegramLogo/></a>
                        </div>
                    </div>
                </div>
                : <div className='flex flex-col gap-[50px]'>
                    <div className='flex justify-between'>
                        <div className='flex flex-col gap-5'>
                            <Text variant={TextVariant.H4}>Меню</Text>
                            <Link to={'/'}>
                                <Text variant={TextVariant.P} className='text-dark-text hover:text-light-brown'>Афиша</Text>
                            </Link>
                            <Link to={'/news'}>
                                <Text variant={TextVariant.P} className='text-dark-text hover:text-light-brown'>Новости</Text>
                            </Link>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <Text variant={TextVariant.H4}>Полезное</Text>
                            <Link to='/refund'>
                                <Text variant={TextVariant.P} className='text-dark-text hover:text-light-brown'>Возврат билетов</Text>
                            </Link>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <Text variant={TextVariant.H4}>Номера для связи</Text>
                        <a href='tel:+79994400249'>
                            <Text variant={TextVariant.P} className='text-dark-text hover:text-light-brown'>+7 999 440-02-49</Text>
                        </a>
                        <a href='tel:+79232157634'>
                            <Text variant={TextVariant.P} className='text-dark-text hover:text-light-brown'>+7 923 215-76-34</Text>
                        </a>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <Text variant={TextVariant.H4}>Мы в соцсетях</Text>
                        <div className='flex gap-2'>
                            <a target={'_blank'} href={'https://vk.com/backstagegroup'} className='flex items-center justify-center w-10 h-10 bg-[#131212] transition-colors duration-100 hover:text-[#0077ff]'><VKLogo/></a>
                            <a target={'_blank'} href={'https://t.me/backstagegroup24'} className='flex items-center justify-center w-10 h-10 bg-[#131212] transition-colors duration-100 hover:text-[#0088cc]'><TelegramLogo/></a>
                        </div>
                    </div>
                </div>}


            <div className='flex flex-col gap-5 md:flex-row md:justify-between md:gap-[30px]'>
                <Link to={'/user_agreement'}>
                    <Text variant={TextVariant.CAPTION} className='text-dark-text hover:text-light-brown'>Пользовательское соглашение</Text>
                </Link>
                <Link to={'/offer'}>
                    <Text variant={TextVariant.CAPTION} className='text-dark-text hover:text-light-brown'>Публичная оферта</Text>
                </Link>
                <Link to={'/privacy_policy'}>
                    <Text variant={TextVariant.CAPTION} className='text-dark-text hover:text-light-brown'>Политика конфиденциальности</Text>
                </Link>
            </div>

            <div className='w-full border-solid border-semi-darkgray border-t-[2px] border-x-0 border-b-0'/>

            <Text variant={TextVariant.CAPTION} className='text-dark-text'>BACKSTAGE GROUP</Text>

            <div className='flex flex-col gap-[30px] md:flex-row md:justify-between md:w-[970px]'>
                <div>
                    <p className='text-dark-text text-[14px] mb-[9px]'>Организатор:</p>
                    <Text variant={TextVariant.P}>Михаил Волик</Text>
                </div>
                <div>
                    <p className='text-dark-text text-[14px] mb-[9px]'>ИНН:</p>
                    <Text variant={TextVariant.P}>245904917048</Text>
                </div>
                <div>
                    <p className='text-dark-text text-[14px] mb-[9px]'>Адрес:</p>
                    <Text className='whitespace-pre-line' variant={TextVariant.P}>{'662313,\nКрасноярский край,\nг. Шарыпово, мкр. 4-й'}</Text>
                </div>
                <div>
                    <p className='text-dark-text text-[14px] mb-[9px]'>ОГРН/ОРГНИП:</p>
                    <Text variant={TextVariant.P}>323246800154125</Text>
                </div>
            </div>

        </section>
    );
};

export default Footer;