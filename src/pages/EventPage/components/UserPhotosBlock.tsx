import Text, {TextVariant} from "../../../components/Text.tsx";
import {useCallback} from "react";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import {useHorizontalScroll} from "../../../hooks/useHorizontalScroll.ts";
import HorizontalScrollButton from "../../../components/Buttons/HorizontalScrollButton.tsx";

const UserPhotosBlock = () => {
    const arr = [1, 2, 3, 4, 5, 6]

    const lg = useMediaBreakpoint('lg')

    const vwToPixels = useCallback((vw: number) => {
        if (typeof window === 'undefined') return 0;
        return (window.innerWidth * vw) / 100;
    }, []);

    const {containerRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight,} = useHorizontalScroll({
        scrollAmount: lg ? 280 : vwToPixels(85),
    });

    return (
        <div className='flex flex-col gap-4'>
            <h3><Text variant={TextVariant.Subtitle_L}>Фотографии зрителей</Text></h3>

            <div className='relative'>
                <div
                    className='flex gap-3 overflow-x-auto scrollbar-hide'
                    ref={containerRef}
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

            <HorizontalScrollButton
                onLeftClick={scrollLeft}
                onRightClick={scrollRight}
                canScrollLeft={canScrollLeft}
                canScrollRight={canScrollRight}
            />
        </div>
    );
};

export default UserPhotosBlock;