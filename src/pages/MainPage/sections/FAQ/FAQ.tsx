import Text, {TextVariant} from '../../../../components/Text'
import QuestionCard from "../../components/QuestionCard.tsx";
import Anchor from "../../../../components/Anchor.tsx";

const Faq = () => {

    const faqArr = [
        {
            question: 'Можно ли вести фото и видео съёмку во время концерта?',
            answer:
                <>
                    Да, вы можете вести любительскую фото и видеосъёмку на мобильные телефоны и небольшие камеры для личного пользования. Мы будем рады, если вы отметите нас в соцсетях! Профессиональная съёмка со вспышкой, штативами и большой оптикой запрещена.
                </>
        },
        {
            question: 'Можно ли купить билет по Пушкинской карте?',
            answer:
                <>
                    К сожалению, мы не принимаем к оплате Пушкинскую карту. Но у нас всегда есть билеты в разных ценовых категориях, чтобы каждый мог найти вариант по своему бюджету.
                </>
        },
        {
            question: 'Нужно ли распечатывать билет?',
            answer:
                <>
                    Нет, распечатывать билет необязательно. Достаточно показать QR-код из письма, которое пришло на вашу электронную почту после покупки.
                </>
        },
        {
            question: 'Где посмотреть фотографии с концерта?',
            answer:
                <>
                    Все фотографии мы загружаем в альбомы в нашей <Anchor href={'https://vk.com/backstagegroup'}> группе ВКонтакте </Anchor> через неделю после завершения концерта. Следите за новостями!
                </>
        },
        {
            question: 'Как с вами связаться?',
            answer:
                <div className='flex flex-col'>
                    <p>Вы можете написать нам в сообщения</p>
                    <p><Anchor href={'https://vk.com/backstagegroup'}>группы ВКонтакте</Anchor>,</p>
                    <p><Anchor href={'https://t.me/backstagegroup24'}>Telegram-канал</Anchor>,</p>
                    <Anchor href={'https://wa.me/79994400249'}>WhatsApp</Anchor>
                    <p>или позвонить по <Anchor href={'tel:+79994400249'}>+7 999 440-02-49</Anchor>, <Anchor href={'tel:+79232157634'}>+7 923 215-76-34</Anchor></p>
                </div>
        },
        {
            question: 'Что делать, если не пришел билет?',
            answer:
                <div className='flex flex-col'>
                    <p>Если вы купили билет на нашем сайте, и он не пришел Вам на почту, напишите</p>
                    <Anchor href={'mailto:help@radario.ru'}>help@radario.ru</Anchor>
                    <p>Так же можете написать нам в <Anchor href={'https://vk.com/backstagegroup'}>группу Вконтакте</Anchor>,</p>
                    <p>или позвонить по +7 999 440-02-49, +7 923 215-76-34</p>
                </div>
        },
        {
            question: 'Как вернуть билет?',
            answer:
                <>
                    Подробную информацию, по возврату билетов, смотрите <Anchor href={'/refund'}>здесь</Anchor>
                </>
        },
    ]

    return (
        <section className='flex flex-col gap-5 xl:w-full w-[90vw]'>
            <h2><Text variant={TextVariant.H2}>ОТВЕТЫ НА ЧАСТЫЕ ВОПРОСЫ</Text></h2>
            <div className='flex flex-col '>
                {faqArr.map((item, index) => (
                    <QuestionCard key={item.question}
                                  question={item.question}
                                  answer={item.answer}
                                  isLast={index === faqArr.length - 1}
                    />
                ))}
            </div>
        </section>
    );
};

export default Faq;