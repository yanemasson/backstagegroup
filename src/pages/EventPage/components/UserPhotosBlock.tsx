import Text, {TextVariant} from "../../../components/Text.tsx";
import IconButton, {IconButtonSize, IconButtonVariant} from "../../../components/Buttons/IconButton.tsx";
import LeftArrowIcon from "../../../assets/icons/arrows/ic_arrow_left.svg?react"
import RightArrowIcon from "../../../assets/icons/arrows/ic_arrow_right.svg?react"
import {useCallback, useEffect, useRef, useState} from "react";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";

const UserPhotosBlock = () => {
    const arr = [1, 2, 3, 4, 5, 6]

    const lg = useMediaBreakpoint('lg')

    const reviewsContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const vwToPixels = useCallback((vw: number) => {
        if (typeof window === 'undefined') return 0;
        return (window.innerWidth * vw) / 100;
    }, []);

    const checkScrollButtons = () => {
        if (reviewsContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = reviewsContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const handleResize = () => checkScrollButtons();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Скролл на 85vw влево
    const scrollLeft = () => {
        if (reviewsContainerRef.current) {
            const scrollAmount = vwToPixels(85);
            reviewsContainerRef.current.scrollBy({
                left: lg ? -280 : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (reviewsContainerRef.current) {
            const scrollAmount = vwToPixels(85);
            reviewsContainerRef.current.scrollBy({
                left: lg ? 280 : scrollAmount,
                behavior: 'smooth'
            });
        }
    };


    const handleScroll = () => {
        checkScrollButtons();
    };

    return (
        <div className='flex flex-col gap-4'>
            <h3><Text variant={TextVariant.Subtitle_L}>Фотографии зрителей</Text></h3>

            <div className='relative'>
                <div
                    className='flex gap-3 overflow-x-auto scrollbar-hide'
                    ref={reviewsContainerRef}
                    onScroll={handleScroll}
                >
                    {arr.map((item) => (
                        <img
                            key={'userImage' + item}
                            alt={'/images/review/' + item + '.png' }
                            src={'/images/review/' + item + '.png' }
                            className='w-[85vw] h-[484px] lg:w-[272px] lg:h-[412px] object-center object-cover'
                        />
                    ))}
                </div>
            </div>

            <div className='flex gap-3'>
                <IconButton
                    variant={IconButtonVariant.FilledSecondary}
                    size={IconButtonSize.small}
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    aria-label="Прокрутить влево"
                >
                    <LeftArrowIcon/>
                </IconButton>

                <IconButton
                    variant={IconButtonVariant.FilledSecondary}
                    size={IconButtonSize.small}
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    aria-label="Прокрутить вправо"
                >
                    <RightArrowIcon/>
                </IconButton>
            </div>
        </div>
    );
};

export default UserPhotosBlock;