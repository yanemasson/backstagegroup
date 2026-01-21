import Tab from "../../../components/Tab.tsx";
import {useState} from "react";
import HorizontalScrollButton from "../../../components/Buttons/HorizontalScrollButton.tsx";
import {useHorizontalScroll} from "../../../hooks/useHorizontalScroll.ts";

const Gallery = () => {
    const photos = [1, 2, 3, 4, 5, 6]
    const videos = [6, 5, 4, 3, 2, 1]

    const [activeSection, setActiveSection] = useState<'photo' | 'video'>('photo')

    const {containerRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight,} = useHorizontalScroll({
        scrollAmount:  576,
    });

    return (
        <div className='flex flex-col gap-6 '>
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

            <div className="flex flex-col gap-4">
                <div className='flex gap-3 overflow-x-auto scrollbar-hide' ref={containerRef}>
                    {activeSection === 'photo' &&
                        photos.map((item) => (
                            <img
                                key={'userImage' + item}
                                alt={'/images/review/' + item + '.png' }
                                src={'/images/review/' + item + '.png' }
                                className='h-[484px] object-center object-cover'
                            />
                        ))
                    }
                    {activeSection === 'video' &&
                        videos.map((item) => (
                            <img
                                key={'userImage' + item}
                                alt={'/images/review/' + item + '.png' }
                                src={'/images/review/' + item + '.png' }
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

            {/*модалка*/}
        </div>
    );
};

export default Gallery;