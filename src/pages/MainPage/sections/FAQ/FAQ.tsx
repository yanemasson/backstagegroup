import Text, {TextVariant} from '../../../../components/Text'
import QuestionCard from "../../components/QuestionCard.tsx";

const Faq = () => {

    const faqArr = [
        {
            answer: 'Можно ли вести фото и видео съёмку во время концерта?',
            question: 'text'
        },
        {
            answer: 'Можно ли приходить на концерт с детьми?',
            question: 'Концечно! Детям очень понравится музыка.' +
                'Для вашего удобство на всех программах стоит возрастной рейтинг,' +
                'чтобы вы приняли решение взять с собой детей или провести время наедине со своей второй половинкой.'
        },
        {
            answer: 'Можно ли проносить свою еду и напитки?',
            question: 'text'
        },
        {
            answer: 'Можно ли вернуть купленный билет?',
            question: 'text'
        },
        {
            answer: 'Как с вами связаться?',
            question: 'text'
        },
        {
            answer: 'Где и когда можно будет найти фотографии с концерта?',
            question: 'text'
        },
    ]

    return (
        <section className='flex flex-col gap-[62px] w-full mb-[120px]'>
            <Text variant={TextVariant.H2}>ОТВЕТЫ НА ЧАСТЫЕ ВОПРОСЫ</Text>
            <div className='flex flex-col gap-[30px] md:px-[30px]'>
                {faqArr.map((item, index) => (
                    <QuestionCard key={item.question}
                                  question={item.answer}
                                  answer={item.question}
                                  isLast={index === faqArr.length - 1}
                    />
                ))}
            </div>
        </section>
    );
};

export default Faq;