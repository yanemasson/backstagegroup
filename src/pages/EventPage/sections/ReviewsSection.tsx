import {useReviews} from "../../../hooks/cms/useReviews.ts";
import {Review} from "../../../types/review.ts";
import Text, {TextVariant} from "../../../components/Text.tsx";
import ReviewComponent from "../../../components/ReviewComponent.tsx";

const ReviewsSection = () => {
    const {reviews} = useReviews();
    const arr = [1, 2, 3, 4, 5, 6]

    return (
        <section className='flex flex-col w-[90vw] md:w-[1166px] gap-[50px] md:gap-[60px] min-h-[254px] '>
            <Text variant={TextVariant.H2}>НАШИ КОНЦЕРТЫ ГЛАЗАМИ ЗРИТЕЛЕЙ</Text>

            <div>
                <Text variant={TextVariant.H4}>Фотографии зрителей</Text>
                <div className='flex gap-2.5 overflow-x-auto pt-[30px]'>
                    {arr.map((item) => (
                        <img
                            alt={'/images/review/' + item + '.png' }
                            src={'/images/review/' + item + '.png' }
                            className='md:w-[186px] md:h-[276px] w-[290px] h-[431px] object-center object-cover'
                        />
                    ))}
                </div>
            </div>

            <div>
                <Text variant={TextVariant.H4}>Отзывы зрителей</Text>
                <div className='flex gap-2.5 overflow-x-auto pt-[30px]'>
                    {reviews
                        .sort((a, b) => b.date.localeCompare(a.date))
                        .slice(0, 3)
                        .map((review: Review) => (
                            <ReviewComponent key={review.id} review={review} />
                        ))}
                </div>
            </div>

        </section>
    );
};

export default ReviewsSection;