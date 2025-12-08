import Text, {TextVariant} from "../../../components/Text.tsx";
import UserPhotosBlock from "../components/UserPhotosBlock.tsx";
import UserReviewBlock from "../components/UserReviewBlock.tsx";


const ReviewsSection = () => {

    return (
        <section className='flex flex-col w-[90vw] lg:w-full gap-11'>
            <h2><Text variant={TextVariant.H2}>НАШИ КОНЦЕРТЫ ГЛАЗАМИ ЗРИТЕЛЕЙ</Text></h2>
            <UserPhotosBlock />
            <UserReviewBlock />
        </section>
    );
};

export default ReviewsSection;