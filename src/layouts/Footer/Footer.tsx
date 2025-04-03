/// <reference types="vite-plugin-svgr/client" />
import Text, {TextVariant} from "../../components/Text.tsx";
import Logo from '/src/assets/icons/logo.svg?react'
import TelegramLogo from '/src/assets/icons/ic_telegram.svg?react'
import VKLogo from '/src/assets/icons/ic_vkontakte.svg?react'
import {Link} from "react-router";

const Footer = () => {
    return (
        <section className='flex flex-col-reverse gap-[60px] xl:gap-0 xl:flex-row xl:justify-between w-[90vw] xl:w-[1166px] py-[50px]'>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-[25px] xl:gap-5'>
                    <Text variant={TextVariant.H4}>Концертное агенство</Text>
                    <div className='flex flex-col gap-[30px] xl:gap-[15px]'>
                        <div className='flex flex-col gap-[5px]'>
                            <Text className='text-lightgray' variant={TextVariant.CAPTION}>Организатор:</Text>
                            <Text variant={TextVariant.P}>ИП Волик Михаил Александрович</Text>
                        </div>
                        <div className='flex flex-col gap-[5px]'>
                            <Text className='text-lightgray' variant={TextVariant.CAPTION}>Адрес:</Text>
                            <Text variant={TextVariant.P}>662313,</Text>
                            <Text variant={TextVariant.P}>Красноярский край,</Text>
                            <Text variant={TextVariant.P}>г. Шарыпово, мкр. 4-й</Text>
                        </div>
                        <div className='flex flex-col gap-[5px]'>
                            <Text className='text-lightgray' variant={TextVariant.CAPTION}>ИНН:</Text>
                            <Text variant={TextVariant.P}>245904917048</Text>
                        </div>
                        <div className='flex flex-col gap-[5px]'>
                            <Text className='text-lightgray' variant={TextVariant.CAPTION}>ОГРН/ОРГНИП:</Text>
                            <Text variant={TextVariant.P}>323246800154125</Text>
                        </div>
                    </div>

                </div>
                <div className='flex gap-[15px]'>
                    <Logo/>
                    <div>
                        <Text variant={TextVariant.CAPTION}>Концертное</Text>
                        <Text variant={TextVariant.CAPTION}>агенство</Text>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-[60px]'>
                <div className='flex flex-col gap-[30px] md:justify-between md:flex-row xl:gap-[43px] '>
                    <div className='flex flex-col gap-[15px] xl:gap-5'>
                        <Text variant={TextVariant.H4}>Меню</Text>
                        <div className='flex flex-col gap-2'>
                            <Link className='hover:text-lightgray' to='/refund'>
                                <Text variant={TextVariant.P}>Возврат билетов</Text>
                            </Link>
                            <Link className='hover:text-lightgray' to='/events'>
                                <Text variant={TextVariant.P}>Афиша</Text>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[15px] xl:gap-5'>
                        <Text variant={TextVariant.H4}>Контакты</Text>
                        <Text variant={TextVariant.P}>+7 (987) 487-87-76</Text>
                    </div>
                    <div className='flex flex-col gap-[15px] xl:gap-5'>
                        <Text variant={TextVariant.H4}>Документация</Text>
                        <div className='flex flex-col gap-2'>
                            <Text variant={TextVariant.P}>Политика конфидециальности</Text>
                            <Text variant={TextVariant.P}>Договор офферты</Text>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <Text variant={TextVariant.H4}>Мы в соцсетях</Text>
                    <div className='flex flex-row xl:flex-col xl:w-10 items-center gap-[25px] text-light-brown'>
                        <a target="_blank"
                           className='hover:text-[#0077FF] flex items-center justify-center'
                           href={'https://vk.com/backstagegroup'}>
                            <VKLogo/>
                        </a>
                        <a target="_blank"
                           className='hover:text-[#2AABEE] flex items-center justify-center'
                           href={'https://t.me/backstagegroup24'}>
                            <TelegramLogo/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;