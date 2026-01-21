import Tab from "./Tab.tsx";
import IconButton, {IconButtonSize, IconButtonVariant} from "./Buttons/IconButton.tsx";
import CloseIcon from "../../src/assets/icons/ic_close.svg?react";
import LeftIcon from '../assets/icons/arrows/ic_arrow_left.svg?react'
import RightIcon from '../assets/icons/arrows/ic_arrow_right.svg?react'
import {useState} from "react";

interface SliderProps {
    array: number[],
    propsActiveSection: 'photo' | 'video',
    onClose: () => void,
    activeItemIndex: number,
}

const Slider = ({array, propsActiveSection, onClose, activeItemIndex}: SliderProps) => {

    const [activeSection, setActiveSection] = useState<'photo' | 'video'>(propsActiveSection);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-bg-island py-6 z-40 flex flex-col gap-4 items-center">
            <div className="flex justify-between px-6 items-center w-full">
                <div className='h-11 w-11 flex items-center'>1/5</div>
                <div className="flex">
                    <Tab
                        className='w-[90px]'
                        isActive={activeSection === 'photo'}
                        onClick={() => {setActiveSection('photo')}}
                    >
                        Фото
                    </Tab>
                    <Tab
                        className='w-[90px]'
                        isActive={activeSection === 'video'}
                        onClick={() => {setActiveSection('video')}}
                    >
                        Видео
                    </Tab>
                </div>
                <IconButton><CloseIcon/></IconButton>
            </div>
            <div className='w-screen flex justify-between'>
                <IconButton
                    variant={IconButtonVariant.NoFilledTertiary}
                    size={IconButtonSize.large}
                    className='h-full'
                >
                    <LeftIcon/>
                </IconButton>
                <img className='h-[74vh]' src={'/images/review/' + activeGalleryItem[1] + '.png' }/>
                <IconButton
                    variant={IconButtonVariant.NoFilledTertiary}
                    size={IconButtonSize.large}
                    className='h-full'
                >
                    <RightIcon/>
                </IconButton>
            </div>
            <div className='flex gap-2'>
                {photos.map((item) => (
                    <img className='h-[77px]' src={'/images/review/' + item + '.png' }/>
                ))}
            </div>
        </div>
    );
};

export default Slider;