import Text, {TextVariant} from '../../../../components/Text.tsx'
import video from '/videos/promo_video.mp4?url'
import Button, {ButtonVariant} from "../../../../components/Button.tsx";
import DownArrow from "../../../../components/DownArrow.tsx";
import {useState} from "react";

// Hero.tsx
const Hero = () => {
    const [isButtonHovered, setIsButtonHovered] = useState(false)

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
                <div className='container flex flex-col gap-5 px-4 lg:px-40 items-center text-center'>
                    <Text variant={TextVariant.H1}>Backstage Group</Text>
                    <Text variant={TextVariant.P}>Концерты симфонической музыка и балета</Text>
                    <a onMouseEnter={() => setIsButtonHovered(true)}
                       onMouseLeave={() => setIsButtonHovered(false)}
                       href={'#list'} className='flex flex-row items-center w-max-5 justify-center gap-5'>
                        <Button variant={ButtonVariant.outline}>
                            <div className='flex items-center justify-center gap-5'>
                                К списку
                                <div className={'-translate-y-2'}><DownArrow hover={isButtonHovered}/></div>
                            </div>
                        </Button>

                    </a>

                </div>
            </div>
        </section>
    );
};

export default Hero;