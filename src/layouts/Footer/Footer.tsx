/// <reference types="vite-plugin-svgr/client" />
import Text, {TextVariant} from "../../components/Text.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import Logo from '../../assets/logos/logo_bg_full.svg?react';
import IconButton, {IconButtonSize, IconButtonVariant} from "../../components/Buttons/IconButton.tsx";
import VKLogo from "../../assets/logos/logo_vk.svg?react";
import TelegramLogo from "../../assets/logos/logo_telegram.svg?react";
import LinkItem from "../../components/LinkItem.tsx";


const Footer = () => {
    const lg = useMediaBreakpoint('lg')

    if(lg) {
        return (
            <section id='footer' className='py-[52px] w-full flex justify-between'>
                <div className='flex flex-col gap-[52px]'>
                    <Logo/>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2'>
                            <Text variant={TextVariant.Body_S}>ИП Михаил Волик</Text>
                            <Text className='text-text-tertiary' variant={TextVariant.Overline}>Организатор</Text>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Text variant={TextVariant.Body_S}>245904917048</Text>
                            <Text className='text-text-tertiary' variant={TextVariant.Overline}>ИНН</Text>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Text variant={TextVariant.Body_S}>323246800154125</Text>
                            <Text className='text-text-tertiary' variant={TextVariant.Overline}>ОГРН/ОРГНИП</Text>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div>
                                <Text variant={TextVariant.Body_S}>662313,</Text>
                                <Text variant={TextVariant.Body_S}>Красноярский край, </Text>
                                <Text variant={TextVariant.Body_S}>г. Шарыпово, мкр. 4-й</Text>
                            </div>
                            <Text className='text-text-tertiary' variant={TextVariant.Overline}>Адрес</Text>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-between'>
                    <div className='flex gap-[52px]'>
                        <div className='flex flex-col gap-3'>
                            <Text  variant={TextVariant.Subtitle_M}>Меню</Text>
                            <LinkItem to='/news' className='text-text-tertiary'>Новости</LinkItem>
                            <LinkItem to='/events' className='text-text-tertiary'>Афиша</LinkItem>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Text variant={TextVariant.Subtitle_M}>Полезное</Text>
                            <LinkItem to='/refund' className='text-text-tertiary'>Возврат билетов</LinkItem>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Text  variant={TextVariant.Subtitle_M}>Номера для связи</Text>
                            <Text className='text-text-tertiary' variant={TextVariant.Body_S}>+7 999 440-02-49</Text>
                            <Text className='text-text-tertiary' variant={TextVariant.Body_S}>+7 923 215-76-34</Text>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Text variant={TextVariant.Subtitle_M}>Мы в соцсетях</Text>
                            <a target={'_blank'} href={'https://t.me/backstagegroup24'}>
                                <IconButton size={IconButtonSize.small} variant={IconButtonVariant.NoFilledTertiary}>
                                    <TelegramLogo/>
                                </IconButton>
                            </a>
                            <a target={'_blank'} href={'https://vk.com/backstagegroup'}>
                                <IconButton size={IconButtonSize.small} variant={IconButtonVariant.NoFilledTertiary}>
                                    <VKLogo/>
                                </IconButton>
                            </a>
                        </div>
                    </div>
                    <div className='flex gap-6 justify-end'>
                        <LinkItem to='/user_agreement' className='text-text-tertiary'>Пользовательское соглашение</LinkItem>
                        <LinkItem to='/offer' className='text-text-tertiary'>Оферта</LinkItem>
                        <LinkItem to='/privacy_policy' className='text-text-tertiary'>Политика конфиденциальности</LinkItem>
                    </div>
                </div>
            </section>
        );
    }
    return (
        <section id='footer' className='py-[52px] w-full flex flex-col justify-between gap-[52px]'>
            <Logo/>
            <div className='flex flex-col gap-11'>
                <div className='flex gap-[52px]'>
                    <div className='flex flex-col gap-3'>
                        <Text  variant={TextVariant.Subtitle_M}>Меню</Text>
                        <LinkItem to='/news' className='text-text-tertiary'>Новости</LinkItem>
                        <LinkItem to='/events' className='text-text-tertiary'>Афиша</LinkItem>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Text variant={TextVariant.Subtitle_M}>Полезное</Text>
                        <LinkItem to='/refund' className='text-text-tertiary'>Возврат билетов</LinkItem>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <Text  variant={TextVariant.Subtitle_M}>Номера для связи</Text>
                    <a href='tel:+79994400249'>
                        <Text className='text-text-tertiary' variant={TextVariant.Body_S}>+7 999 440-02-49</Text>
                    </a>
                    <a href='tel:+79232157634'>
                        <Text className='text-text-tertiary' variant={TextVariant.Body_S}>+7 923 215-76-34</Text>
                    </a>
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-3'>
                        <Text variant={TextVariant.Subtitle_M}>Мы в соцсетях</Text>
                        <a target={'_blank'} href={'https://t.me/backstagegroup24'}>
                            <IconButton size={IconButtonSize.small} variant={IconButtonVariant.NoFilledTertiary}>
                                <TelegramLogo/>
                            </IconButton>
                        </a>
                        <a target={'_blank'} href={'https://vk.com/backstagegroup'}>
                            <IconButton size={IconButtonSize.small} variant={IconButtonVariant.NoFilledTertiary}>
                                <VKLogo/>
                            </IconButton>
                        </a>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex gap-6'>
                            <LinkItem to='/user_agreement' className='text-text-tertiary'>Пользовательское соглашение</LinkItem>
                            <LinkItem to='/offer' className='text-text-tertiary'>Оферта</LinkItem>
                        </div>

                        <LinkItem to='/privacy_policy' className='text-text-tertiary'>Политика конфиденциальности</LinkItem>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-11'>
                <div className='flex gap-[52px]'>
                    <div className='flex flex-col gap-2'>
                        <Text variant={TextVariant.Body_S}>ИП Михаил Волик</Text>
                        <Text className='text-text-tertiary' variant={TextVariant.Overline}>Организатор</Text>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Text variant={TextVariant.Body_S}>245904917048</Text>
                        <Text className='text-text-tertiary' variant={TextVariant.Overline}>ИНН</Text>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Text variant={TextVariant.Body_S}>323246800154125</Text>
                    <Text className='text-text-tertiary' variant={TextVariant.Overline}>ОГРН/ОРГНИП</Text>
                </div>
                <div className='flex flex-col gap-2'>
                    <div>
                        <Text variant={TextVariant.Body_S}>662313,</Text>
                        <Text variant={TextVariant.Body_S}>Красноярский край, </Text>
                        <Text variant={TextVariant.Body_S}>г. Шарыпово, мкр. 4-й</Text>
                    </div>
                    <Text className='text-text-tertiary' variant={TextVariant.Overline}>Адрес</Text>
                </div>
            </div>

        </section>
        )


};

export default Footer;