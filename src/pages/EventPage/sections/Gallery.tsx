import Tab, {TabButtonSize} from "../../../components/Tab.tsx";
import {useState} from "react";
import HorizontalScrollButton from "../../../components/Buttons/HorizontalScrollButton.tsx";
import {useHorizontalScroll} from "../../../hooks/useHorizontalScroll.ts";
import IconButton, {IconButtonSize, IconButtonVariant} from "../../../components/Buttons/IconButton.tsx";
import CloseIcon from '../../../assets/icons/ic_close.svg?react'
import LeftIcon from '../../../assets/icons/arrows/ic_arrow_left.svg?react'
import RightIcon from '../../../assets/icons/arrows/ic_arrow_right.svg?react'
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import Text, {TextVariant} from "../../../components/Text.tsx";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";
import {useBodyScrollLock} from "../../../hooks/useBodyScrollLock.ts";

interface GalleryProps {
    photos: string[];
    videos: string[];
}

const Gallery = ({photos, videos} : GalleryProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [activeSection, setActiveSection] = useState<'photo' | 'video'>('photo')
    const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0)
    const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0)

    const handleClick = (index: number) => {
        setActivePhotoIndex(index);
        setIsOpen(true)
    }
    const goToPrevious = () => {
        if (activeSection === 'photo') {
            setActivePhotoIndex((prev) =>
                prev === 0 ? photos.length - 1 : prev - 1
            );
        }
        if (activeSection === 'video') {
            setActiveVideoIndex((prev) =>
                prev === 0 ? videos.length - 1 : prev - 1
            );
        }
    };
    const goToNext = () => {

        if (activeSection === 'photo') {
            setActivePhotoIndex((prev) =>
                prev === photos.length - 1 ? 0 : prev + 1
            );
        }
        if (activeSection === 'video') {
            setActiveVideoIndex((prev) =>
                prev === videos.length - 1 ? 0 : prev + 1
            );
        }

    };

    const md = useMediaBreakpoint('md')

    useBodyScrollLock(isOpen);

    const {containerRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight,} = useHorizontalScroll({
        scrollAmount:  576,
    });

    return (
        <div className='flex flex-col gap-6 '>
            <div className="flex">
                {photos && photos.length > 0 && (
                    <Tab
                        className='w-[90px]'
                        isActive={activeSection === 'photo'}
                        onClick={() => {setActiveSection('photo')}}
                        disabled={!photos || photos.length === 0}
                    >
                        Фото
                    </Tab>
                )}

                <Tab
                    className='w-[90px]'
                    isActive={activeSection === 'video'}
                    onClick={() => {setActiveSection('video')}}
                    disabled={!videos || videos.length === 0}
                >
                    Видео
                </Tab>


            </div>

            <div className="flex flex-col gap-4">
                <div className='flex gap-3 overflow-x-auto scrollbar-hide' ref={containerRef}>
                    {activeSection === 'photo' &&
                        photos.map((item, index) => (
                            <img
                                key={'userImage' + item}
                                alt={`Фотография ${index + 1}`}
                                src={item}
                                loading="lazy"
                                className='h-[484px] object-center object-cover'
                                onClick={() => {handleClick(index)}}
                            />
                        ))
                    }
                    {activeSection === 'video' &&
                        videos.map((item) => (
                            <VideoPlayer
                                key={'userImage' + item}
                                video={item}
                                buttonType='play'
                                className='h-[484px] object-center object-cover'
                            />
                        ))
                    }

                </div>

                <HorizontalScrollButton
                        onLeftClick={scrollLeft}
                        onRightClick={scrollRight}
                        canScrollLeft={canScrollLeft}
                        canScrollRight={canScrollRight}
                />
            </div>

            {isOpen &&
                <div className='fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-bg-island z-50 flex flex-col w-screen h-screen gap-4 py-6 items-center justify-between'>
                    <div className='md:px-6 flex justify-between items-center text-center w-[90vw] '>

                        <div className='h-11 w-11 flex justify-center items-center text-text-tertiary'>
                            <Text variant={TextVariant.Body_M}>
                                {activeSection === 'photo' && <>{activePhotoIndex + 1}/{photos.length}</>}
                                {activeSection === 'video' && <>{activeVideoIndex + 1}/{photos.length}</>}

                            </Text>
                        </div>

                        <div className="flex">
                            <Tab
                                size={TabButtonSize.small}
                                className='w-[90px]'
                                isActive={activeSection === 'photo'}
                                onClick={() => {setActiveSection('photo')}}
                                disabled={!photos || photos.length === 0}
                            >
                                Фото
                            </Tab>
                            <Tab
                                size={TabButtonSize.small}
                                className='w-[90px]'
                                isActive={activeSection === 'video'}
                                onClick={() => {setActiveSection('video')}}
                                disabled={!videos || videos.length === 0}
                            >
                                Видео
                            </Tab>
                        </div>

                        <IconButton
                            variant={IconButtonVariant.FilledSecondary}
                            size={IconButtonSize.small}
                            onClick={() => {setIsOpen(false)}}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <div className='flex h-[70vh] items-center justify-between w-screen relative'>
                        <IconButton
                            variant={IconButtonVariant.NoFilledTertiary}
                            size={md ? IconButtonSize.large : IconButtonSize.small}
                            className='h-full absolute left-0 top-1/2 -translate-y-1/2 z-50'
                            onClick={goToPrevious}
                        >
                            <LeftIcon/>
                        </IconButton>

                        <img
                            key={`Photo ${activePhotoIndex + 1}`}
                            alt={`Photo ${activePhotoIndex + 1}`}
                            src={photos[activePhotoIndex]}
                            className='h-full w-full object-contain'
                        />

                        <IconButton
                            variant={IconButtonVariant.NoFilledTertiary}
                            size={md ? IconButtonSize.large : IconButtonSize.small}
                            className='h-full absolute right-0 top-1/2 -translate-y-1/2 z-50'
                            onClick={goToNext}
                        >
                            <RightIcon/>
                        </IconButton>
                    </div>

                    <div className='flex overflow-x-auto scrollbar-hide gap-2 px-4'>
                        {activeSection === 'photo' &&
                            photos.map((item, index) => (
                                <img
                                    key={'thumb' + item}
                                    alt={`Фотография ${index + 1}`}
                                    src={item}
                                    loading="lazy"
                                    className='h-[77px] cursor-pointer'
                                    onClick={() => {handleClick(index)}}
                                />
                            ))
                        }
                        {activeSection === 'video' &&
                            videos.map((item) => (
                                <VideoPlayer
                                    key={'userImage' + item}
                                    video={item}
                                    buttonType='play'
                                    className='h-[484px] object-center object-cover'
                                />
                            ))
                        }
                    </div>
                </div>
               }

        </div>
    );
};

export default Gallery;