import Text, {TextVariant} from "../../../components/Text.tsx";
import image from '/public/images/about/image 52.png'

const AboutUsSection = () => {
    return (
        <section id='about' className='flex flex-col gap-[100px] xl:gap-40'>
            <div className='flex flex-col gap-[50px]'>
                <div className='xl:w-[629px]'>
                    <Text variant={TextVariant.H2}>BACKSTAGE GROUP<br/>ДАРИТ ВАМ НЕЗАБЫВАЕМЫЕ ЭМОЦИИ</Text>
                </div>
                <div className='flex flex-col lg:flex-row-reverse self-center items-center gap-[42px] xl:w-full max-w-[90vw] '>
                    <img className='lg:w-3/4' alt='about' src={image}/>
                    <div className='flex flex-col md:flex-row md:gap-[90px] lg:flex-col gap-[25px] lg:justify-between w-full '>
                        <div className='flex flex-col leading-tight w-[181px] xl:w-[200px] '>
                            <Text variant={TextVariant.P}>Количество концертов в разных городах</Text>
                            <p className='font-display lining-nums text-light-brown text-[68px] xl:text-[100px] tracking-[0.07em]'>10</p>
                        </div>
                        <div className='flex flex-col leading-tight xl:w-[260px] '>
                            <Text variant={TextVariant.P}>Зрителей<br/>в общей сумме</Text>
                            <p className='font-display lining-nums text-light-brown text-[68px] xl:text-[100px] tracking-[0.07em]'>4000</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-[50px]'>
                <Text className='leading-none' variant={TextVariant.H2}>МЫ ВЕРИМ, ЧТО МУЗЫКА ИЗ КИНО — ЭТО ОТДЕЛЬНОЕ ИСКУССТВО</Text>
                <div className='flex flex-col xl:flex-row justify-between gap-[25px] w-full'>
                    <div className='flex flex-col gap-[5px] w-[240px] '>
                        <Text className='text-light-brown' variant={TextVariant.H4}>Полное погружение</Text>
                        <Text variant={TextVariant.P}>Синхронизация музыки с видео-рядом из фильмов</Text>
                    </div>
                    <div className='flex flex-col gap-[5px] max-w-[323px] '>
                        <Text className='text-light-brown' variant={TextVariant.H4}>Концерт для всех возрастов</Text>
                        <Text variant={TextVariant.P}>Программы подходят как для фанатов кино, так и для ценителей симфонической музыки.</Text>
                    </div>
                    <div className='flex flex-col gap-[5px] max-w-[342px] '>
                        <Text className='text-light-brown' variant={TextVariant.H4}>Камерный состав + современные аранжировки</Text>
                        <Text variant={TextVariant.P}>Мы превращаем масштабные симфонии в интимное, но мощное шоу.</Text>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default AboutUsSection;