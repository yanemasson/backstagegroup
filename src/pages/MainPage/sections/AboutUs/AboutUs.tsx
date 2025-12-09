import Text, {TextVariant} from "../../../../components/Text.tsx";

const AboutUs = () => {
    return (
        <section className='flex flex-col gap-11 w-[90vw] lg:w-full'>
            <h2><Text variant={TextVariant.H2}>{'Наши концерты дарят незабываемые эмоции'.toUpperCase()}</Text></h2>

            <div className='flex flex-col md:flex-row gap-8 items-center justify-between'>
                <img className='lg:w-[667px]' alt={'Насладитесь чистотой и мощью каждого звука'} src='/images/about/image-1.jpg'/>
                <div className='flex flex-col gap-3'>
                    <Text className='text-text-accent' variant={TextVariant.Subtitle_L}>Насладитесь чистотой и мощью каждого звука</Text>
                    <Text variant={TextVariant.Body_L}>Сочетание акустического звучания классических инструментов и точной работы усилительной аппаратуры для кристально чистого и глубокого звука.</Text>
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-8 items-center justify-between'>
                <img className='lg:w-[667px]' alt={'Полное погружение в атмосферу музыки'} src='/images/about/image-2.jpg'/>
                <div className='flex flex-col gap-3'>
                    <Text className='text-text-accent' variant={TextVariant.Subtitle_L}>Полное погружение в атмосферу музыки</Text>
                    <Text variant={TextVariant.Body_L}>Каждая нота обретает видимую форму. Специально подобранный видеоряд усиливает эмоции от музыки, создавая незабываемый аудиовизуальный опыт.</Text>
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-8 items-center justify-between'>
                <img className='lg:w-[667px]' alt={'Живые вокальные номера'} src='/images/about/image-3.jpg'/>
                <div className='flex flex-col gap-3'>
                    <Text className='text-text-accent' variant={TextVariant.Subtitle_L}>Живые вокальные номера</Text>
                    <Text variant={TextVariant.Body_L}>Мы усиливаем ключевые треки выступлениями профессиональных вокалистов, чтобы подарит вам уникальное впечатление от живого исполнения.</Text>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;