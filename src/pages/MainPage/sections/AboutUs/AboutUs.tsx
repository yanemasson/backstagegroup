import Text, {TextVariant} from "../../../../components/Text.tsx";

const AboutUs = () => {
    return (
        <section className='flex flex-col w-[90vw] md:w-[1166px] gap-[50px]'>
            <Text variant={TextVariant.H2}>{'Наши концерты дарят незабываемые эмоции'.toUpperCase()}</Text>

            <div className='flex flex-col md:flex-row-reverse items-center justify-between'>
                <img className='mb-[30px] md:mb-0 md:w-[583px]' alt={'Насладитесь чистотой и мощью каждого звука'} src='/images/about/image-1.jpg'/>
                <div className=' md:w-[455px]'>
                    <p className='text-light-brown text-[24px] mb-[20px] md:mb-0'>Насладитесь чистотой и мощью каждого звука</p>
                    <Text variant={TextVariant.P}>Сочетание акустического звучания классических инструментов и точной работы усилительной аппаратуры для кристально чистого и глубокого звука.</Text>
                </div>
            </div>

            <div className='flex flex-col md:flex-row items-center justify-between'>
                <img className='mb-[30px] md:mb-0 md:w-[583px] ' alt={'Полное погружение в атмосферу музыки'} src='/images/about/image-2.jpg'/>
                <div className='md:w-[455px]'>
                    <p className='text-light-brown text-[24px] mb-[20px] md:mb-0'>Полное погружение в атмосферу музыки</p>
                    <Text variant={TextVariant.P}>Каждая нота обретает видимую форму. Специально подобранный видеоряд усиливает эмоции от музыки, создавая незабываемый аудиовизуальный опыт.</Text>
                </div>
            </div>

            <div className='flex flex-col md:flex-row-reverse items-center justify-between'>
                <img className='mb-[30px] md:mb-0 md:w-[583px] ' alt={'Живые вокальные номера'} src='/images/about/image-3.jpg'/>
                <div className='md:w-[455px]'>
                    <p className='text-light-brown text-[24px] mb-[20px] md:mb-0'>Живые вокальные номера</p>
                    <Text variant={TextVariant.P}>Мы усиливаем ключевые треки выступлениями профессиональных вокалистов, чтобы подарит вам уникальное впечатление от живого исполнения.</Text>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;