import Text, {TextVariant} from "../../../components/Text.tsx";
import {Event} from "../../../types/event.ts"
import {getDate} from "../../../utils/getDate.ts";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import {useEffect, useState} from "react";
import {useActiveSection} from "../../../hooks/useActiveSection.ts";

interface HeaderProps {
    item: Event
}

const Header = ({item}: HeaderProps) => {
    const xl = useMediaBreakpoint('xl')
    const [visible, setVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);
    const isHero = useActiveSection() === 'hero';

    useEffect(() => {
        const controlHeader = () => {
            const currentScrollY = window.scrollY;
            if (!hasScrolled && currentScrollY > 50) {
                setHasScrolled(true);
            }
            if (hasScrolled) {
                if (currentScrollY < lastScrollY) {
                    setVisible(true);
                } else if (currentScrollY > lastScrollY) {
                    setVisible(false);
                }
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlHeader);
        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, [lastScrollY, hasScrolled]);
    
    if(!item) return null

    const datetime = getDate(item.date)

    return (
        <div className={`flex justify-center bg-darkgray z-30 fixed flex-col xl:flex-row
            ${visible && !isHero ? 'transform-none' : 'transform -translate-y-[200px]'}  transition-all duration-300
            border-solid border-x-0 border-b-0 border-t-0.5 border-gray 
            w-full h-[133px] top-[64px] xl:w-[1166px] xl:h-[110px] xl:top-[84px]`}>
            <div className="w-[90vw] flex flex-col items-center xl:flex-row gap-[15px] xl:justify-between">
                <div className='flex xl:w-8/12 gap-5 justify-between xl:gap-[70px]'>
                    <div className='flex leading-none h-[52px] gap-[13px]'>
                        <p className='font-display font-medium text-[40px] xl:text-[52px] lining-nums'>{datetime.day}</p>
                        <div>
                            <p className='font-display font-medium xl:text-[28px] text-[16px] tracking-[0.07em]'>{datetime.time}</p>
                            <p className='font-display font-medium text-[24px] tracking-[0.07em]'>{xl ? datetime.monthStr : datetime.monthStr.substring(0,3)}</p>
                        </div>
                    </div>
                    <Text className='leading-none whitespace-pre-line' variant={TextVariant.H3}>
                        {item.title.toUpperCase().split(' ').join('\n')}
                    </Text>
                    {xl &&
                        <div className='w-[198px]'>
                            <Text variant={TextVariant.P}>г. {item.city}</Text>
                            <Text className='text-lightgray' variant={TextVariant.CAPTION}>{item.location}</Text>
                        </div>
                    }
                </div>

                <TicketButton className='w-[90vw] h-[45px] xl:w-[286px] xl:h-[43px]' eventId={item.eventId}/>
            </div>
        </div>
    );
};

export default Header;