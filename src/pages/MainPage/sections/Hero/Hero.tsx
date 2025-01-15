import Text, {TextVariant} from '../../../../components/Text.tsx'
import video from '/videos/promo_video.mp4?url'

// Hero.tsx
const Hero = () => {

    return (
        <section id='hero' className='bg-black h-screen text-white relative overflow-hidden'>
            <div className='absolute inset-0 w-full h-full'>
                <video className='absolute inset-0 w-full h-full object-cover' autoPlay loop muted playsInline>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black z-10' />
            <div className='absolute inset-0 flex flex-col items-center justify-center z-20'>
                <div className='container flex flex-col gap-5 px-4 lg:px-40 text-center'>
                    <Text variant={TextVariant.H1}>Backstage Group</Text>
                    <Text variant={TextVariant.P}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores commodi dolor dolore est incidunt ipsa libero natus nostrum porro provident temporibus, voluptatem voluptatibus! Accusantium aliquam blanditiis, dolores earum eveniet facere harum id inventore libero molestiae nobis obcaecati quae quam repellendus tenetur. Debitis dolore enim et facilis id ipsum vero.
                    </Text>
                </div>
            </div>
        </section>
    );
};

export default Hero;