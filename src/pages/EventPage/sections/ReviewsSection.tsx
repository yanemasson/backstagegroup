import {useReviews} from "../../../hooks/cms/useReviews.ts";
import {Review} from "../../../types/review.ts";
import Text, {TextVariant} from "../../../components/Text.tsx";
import ReviewComponent from "../../../components/ReviewComponent.tsx";

const ReviewsSection = () => {
    const {reviews} = useReviews();

    return (
        <section className='flex flex-col gap-[50px]'>
            <Text variant={TextVariant.H2}>ОТЗЫВЫ</Text>
            <div className='flex flex-col gap-5 md:flex-row xl:justify-between'>
                {reviews
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .slice(0, 3)
                    .map((review: Review) => (
                        <ReviewComponent key={review.id} review={review} />
                ))}
            </div>
        </section>
    );
};

export default ReviewsSection;