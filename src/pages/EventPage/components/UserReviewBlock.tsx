import Text, {TextVariant} from "../../../components/Text.tsx";
import {Review} from "../../../types/review.ts";
import ReviewComponent from "../../../components/ReviewComponent.tsx";
import IconButton, {IconButtonSize, IconButtonVariant} from "../../../components/Buttons/IconButton.tsx";
import {useReviews} from "../../../hooks/cms/useReviews.ts";
import LeftArrowIcon from "../../../assets/icons/arrows/ic_arrow_left.svg?react"
import RightArrowIcon from "../../../assets/icons/arrows/ic_arrow_right.svg?react"
import {useHorizontalScroll} from "../../../hooks/useHorizontalScroll.ts";

const UserReviewBlock = () => {
    const {reviews} = useReviews();
    const {containerRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight,} = useHorizontalScroll({scrollAmount: 380,});

    return (
        <div className='flex flex-col gap-4'>
            <h3><Text variant={TextVariant.Subtitle_L}>Отзывы зрителей</Text></h3>

            <div className='relative'>
                <div
                    ref={containerRef}
                    className='flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth'
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