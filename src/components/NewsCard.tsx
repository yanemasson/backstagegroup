import {getDate} from "../utils/getDate.ts";
import Button, {ButtonSize, ButtonVariant} from "./Buttons/Button.tsx";
import Text, {TextVariant} from "./Text.tsx";
import {Link} from "react-router";
import {WordPressPost} from "../api";
import {truncateToWord} from "../utils/truncateToWord.ts";

interface NewsCardProps {
    post: WordPressPost;
}

const NewsCard = ({post}: NewsCardProps) => {

    const datetime = getDate(post.date)
    const title = post.title.rendered;
    const textPreview = post.excerpt?.rendered
        ? new DOMParser().parseFromString(post.excerpt.rendered, 'text/html').body.textContent || ''
        : '';
    const poster = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const href = `/news/${post.id}`;

    return (
        <div className='flex flex-col lg:flex-row  gap-6 w-full'>
            <img className='w-[570px] object-cover' src={poster} alt={title} />
            <div className='flex flex-col gap-6 justify-between items-start'>
                <div className='flex flex-col gap-3'>
                    <Text className='text-text-tertiary' variant={TextVariant.Overline}>{datetime.formattedDate}</Text>
                    <h3>
                        <Text className='text-text-accent' variant={TextVariant.Subtitle_L}>
                            <span dangerouslySetInnerHTML={{ __html: title }} />
                        </Text>
                    </h3>
                    <div className='flex flex-col gap-2.5'>
                        <Text variant={TextVariant.Body_L}>{truncateToWord(textPreview, 150)}...</Text>
                    </div>
                </div>
                <Link className='w-full' to={href}>
                    <Button size={ButtonSize.medium}
                        className='w-full lg:w-[171px]'
                        variant={ButtonVariant.tertiary}
                        onClick={() => {}}
                    >
                        Читать статью
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;