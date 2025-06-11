import Text, {TextVariant} from "../../../components/Text.tsx";
import {WordPressPost} from "../../../api";
import WordPressContent from "../../../components/WordPressContent.tsx";

const Article = ({ post }: { post: WordPressPost }) => {
    const poster = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    return (
        <section className='flex flex-col gap-10'>
            <Text className='text-light-brown' variant={TextVariant.H1}>{post.title.rendered.toUpperCase()}</Text>
            <img src={poster} alt={poster}/>
            <div className='flex flex-col gap-[30px]'>
                <div className='w-full flex flex-col gap-6 lg:w-[688px] xl:w-[872px]'>
                    {post.content?.rendered && (
                        <WordPressContent
                            content={post.content.rendered}
                            className='text-white leading-[160%] md:w-[605px] lg:w-[688px]'
                        />
                    )}
                </div>
            </div>
        </section>
    );
};
export default Article;