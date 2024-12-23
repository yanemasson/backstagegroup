import BackgroundVideo from '../../../../../public/videos/promo_video.mp4'
import Text, {TextVariant} from '../../../../components/Text.tsx'

const Hero = () => {
    return (
        <section id='hero' className='bg-black h-screen text-white'>
            <video className='absolute w-full h-full object-cover' autoPlay loop muted playsInline>
                <source src={BackgroundVideo} type="video/mp4" />
            </video>
            <div className='absolute w-full h-full bg-gradient-to-b from-[#000]/50 via-[#000]/50 to-black z-10'/>
            <div className=' absolute flex flex-col px-5 lg:px-40 h-full text-center items-center justify-center z-20'>
                <Text variant={TextVariant.H1} >Backstage Group</Text>
                <Text variant={TextVariant.P}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda blanditiis eaque enim eum exercitationem laborum, molestiae, mollitia odit quia quis quo ratione reprehenderit voluptatibus.</Text>
            </div>
        </section>
    );
};

export default Hero;