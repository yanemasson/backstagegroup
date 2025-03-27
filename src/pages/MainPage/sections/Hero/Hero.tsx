import Text, {TextVariant} from '../../../../components/Text.tsx'
import Button, {ButtonVariant} from "../../../../components/Buttons/Button.tsx";
import useMainPage from "../../../../hooks/cms/useMainPage.ts";
import SlideShow from "../../../../components/SlideShow.tsx";

// Hero.tsx
const Hero = () => {
    const mainPageContent = useMainPage();

    return (
        <section id='hero' className='bg-black h-screen w-[90wv] text-white'>
            <div className='absolute inset-0 w-full h-full overflow-hidden'>
                {mainPageContent?.images && <SlideShow slides={mainPageContent.images}/>}
            </div>

            <div className='absolute inset-0 bg-gradient-to-b from-darkgray/70 via-darkgray/80 to-darkgray z-10' />
            <div className='absolute inset-0 flex flex-col items-center justify-center z-20'>
                <div className='container flex flex-col gap-5 px-4 lg:px-40 items-center text-center'>
                    <Text variant={TextVariant.H1}>BACKSTAGE GROUP</Text>
                    <Text variant={TextVariant.P}>{mainPageContent?.description}</Text>
                    <a href={'#eventlist'} className='flex flex-row items-center w-max-5 justify-center gap-5'>
                        <Button className='h-[43px] w-[183px]' variant={ButtonVariant.outline}>
                            <div className='flex items-center justify-center gap-5'>Афиша</div>
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;