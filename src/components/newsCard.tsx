import {getDate} from "../utils/getDate.ts";
import Button, {ButtonVariant} from "./Buttons/Button.tsx";
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
        <div className='flex flex-col gap-5 md:flex-row justify-between xl:w-[1200px]'>
            <img className='md:w-[349px] lg:w-[435px] xl:w-[558px] object-cover' src={poster} alt={title} />
            <div className='flex flex-col gap-5 md:gap-[83px] md:w-[359px] lg:w-[435px] xl:w-[578px] justify-between items-start'>
                <div className='flex flex-col gap-5'>
                    <Text className='text-lightgray' variant={TextVariant.CAPTION}>{datetime.formattedDate}</Text>
                    <div className='flex flex-col gap-2.5'>
                        {/* Используем dangerouslySetInnerHTML для отображения HTML в заголовке */}
                        <Text className='text-light-brown' variant={TextVariant.H4}>
                            <span dangerouslySetInnerHTML={{ __html: title }} />
                        </Text>
                        <Text variant={TextVariant.P}>{truncateToWord(textPreview, 200)}...</Text>
                    </div>
                </div>
                <Link className='w-full' to={href}>
                    <Button
                        className='w-full md:w-[284px] h-[53px] bg-semi-darkgray'
                        variant={ButtonVariant.secondary}
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