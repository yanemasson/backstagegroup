import Text, {TextVariant} from "../../../components/Text.tsx";
import {Review} from "../../../types/review.ts";
import ReviewComponent from "../../../components/ReviewComponent.tsx";
import IconButton, {IconButtonSize, IconButtonVariant} from "../../../components/Buttons/IconButton.tsx";
import {useReviews} from "../../../hooks/cms/useReviews.ts";
import LeftArrowIcon from "../../../assets/icons/arrows/ic_arrow_left.svg?react"
import RightArrowIcon from "../../../assets/icons/arrows/ic_arrow_right.svg?react"
import {useEffect, useRef, useState} from "react";

const UserReviewBlock = () => {
    const {reviews} = useReviews();

    const reviewsContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScrollButtons = () => {
        if (reviewsContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = reviewsContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);
        return () => window.removeEventListener('resize', checkScrollButtons);
    }, []);

    const scrollLeft = () => {
        if (reviewsContainerRef.current) {
            reviewsContainerRef.current.scrollBy({
                left: -380,
                behavior: 'smooth'
            });
        }
    };
    const scrollRight = () => {
        if (reviewsContainerRef.current) {
            reviewsContainerRef.current.scrollBy({
                left: 380,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        checkScrollButtons();
    };

    return (
        <div className='flex flex-col gap-4'>
            <h3><Text variant={TextVariant.Subtitle_L}>Отзывы зрителей</Text></h3>

            <div className='relative'>
                <div
                    ref={reviewsContainerRef}
                    className='flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth'
                    onScroll={handleScroll}
                >
                    {reviews
                        .sort((a, b) => b.date.localeCompare(a.date))
                        .map((review: Review) => (
                            <ReviewComponent key={review.id} review={review} />
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

export default UserReviewBlock;