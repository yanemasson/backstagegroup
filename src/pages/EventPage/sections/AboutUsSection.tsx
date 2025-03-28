import Text, {TextVariant} from "../../../components/Text.tsx";
import image from '/public/images/about/image 52.png'

const AboutUsSection = () => {
    return (
        <section id='about' className='flex flex-col gap-[100px] xl:gap-40'>
            <div className='flex flex-col gap-[50px]'>
                <div className='xl:w-[629px] leading-none'>
                    <Text variant={TextVariant.H2}>BACKSTAGE GROUP</Text>
                    <Text variant={TextVariant.H2}>ДАРИТ ВАМ</Text>
                    <Text variant={TextVariant.H2}>НЕЗАБЫВАЕМЫЕ ЭМОЦИИ</Text>
                </div>
                <div className='flex flex-col self-center items-center gap-[42px] max-w-80 xl:max-w-[774px]'>
                    <img  alt='about' src={image}/>
                    <div className='flex flex-col xl:flex-row gap-[25px] justify-between w-full '>
                        <div className='flex flex-col leading-tight w-[181px] xl:w-[200px] '>
                            <Text variant={TextVariant.P}>Количество концертов в разных городах</Text>
                            <p className='font-display lining-nums text-light-brown text-[68px] xl:text-[100px] tracking-[0.07em]'>10</p>
                        </div>
                        <div className='flex flex-col leading-tight xl:w-[260px] '>
                            <Text variant={TextVariant.P}>Зрителей</Text>
                            <Text variant={TextVariant.P}>в общей сумме</Text>
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