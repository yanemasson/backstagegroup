import Text, {TextVariant} from "../../components/Text.tsx";
import {SEO} from "../../components/SEO.tsx";
import Anchor from "../../components/Anchor.tsx";
import Button, {ButtonVariant} from "../../components/Buttons/Button.tsx";
import {Link} from "react-router";

const RefundPage = () => {
    return (
        <>
            <SEO title={'Возврат билетов | Бэкстейдж, афиша, концерт, билеты'}
                 description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                     "Классическая музыка, премьеры в Вашем городе"}/>
            <div className='flex flex-col w-full items-start gap-10 '>
                <div className='text-white flex flex-col items-start justify-center gap-5 pt-20 px-5 xl:px-0'>
                    <Text variant={TextVariant.H1}>Возврат билетов</Text>
                    <Text variant={TextVariant.B}>Уважаемые зрители! Если Вы хотите вернуть билет, выберите, пожалуйста,
                        вашу ситуацию и дальше действуйте СОГЛАСНО ИНСТРУКЦИИ:
                    </Text>
                    <Text variant={TextVariant.P}>
                        В соответствии с Федеральным законом от 18.07.2019 N 193-ФЗ
                        «О внесении изменений в Закон РФ «Основы законодательства РФ о культуре»
                        установлен следующий порядок возврата приобретенных билетов.
                        <br/>Если покупатель обратился:
                        <br/>Менее чем за 3 дня до начала мероприятия - деньги не возвращаются
                        <br/>от 3 до 5 дней до начала мероприятия - возвращается 30% стоимости
                        <br/>от 5 до 10 дней до начала мероприятия - возвращается 50% стоимости
                        <br/>от 10 дней и более - возвращается 100% стоимости
                        <br/>День самого мероприятия не считается. Например, Вы подали заявку 1 июня, а мероприятие 9 июня
                        - заявка будет считаться оформленной за 8 дней до даты мероприятия.
                        <br/>Возврат денежных средств по причине болезни производится в 100% стоимости билета,
                        при наличии документов подтверждающих факт болезни.
                        <br/>Сервисный сбор (если он взимался при приобретении билетов) не возвращается!
                    </Text>
                    <Text variant={TextVariant.P}>
                        Если билеты  приобретались на нашем сайте https://backstagegroup.ru/ для возврата {' '}
                        <Anchor href={'https://radario.ru/customer/refunds/submit'}>
                            <Text variant={TextVariant.B}>ВОСПОЛЬЗУЙТЕСЬ ФОРМОЙ ВОЗВРАТА</Text>
                        </Anchor> уполномоченного билетного оператора «РАДАРИО»
                    </Text>
                    <Text variant={TextVariant.P}>
                        Если билеты приобретались у билетного оператора «Kassy.ru», возврат осуществляется {' '}
                        <Anchor href={'https://kras.kassy.ru/text/pravila-vozvrata-biletov/'}>
                            <Text variant={TextVariant.B}>согласно правилам возврата компании</Text>
                        </Anchor>
                        <br/>Дополнительная информация по телефону +7 (391) 206-90-00
                    </Text>
                    <Text variant={TextVariant.P}>
                        Если билеты приобретались у билетного оператора «Красбилет», возврат осуществляется {' '}
                        <Anchor href={'https://krasbilet.ru/text/pravila-vozvrata-biletov/'}>
                            <Text variant={TextVariant.B}>согласно правилам возврата компании</Text>
                        </Anchor>
                        <br/>Дополнительная информация по телефону +7 (391) 288-88-81
                    </Text>
                    <Text variant={TextVariant.B}>
                        Если вы купили билет на нашем сайте, и он не пришел Вам на почту, напишите {' '}
                        <Anchor href={'mailto:help@radario.ru'}>help@radario.ru</Anchor>
                        <br/>Служба поддержки работает с 7:00 до 23:00 (МСК)
                    </Text>
                </div>
                <div className='flex items-center gap-5 '>
                    <Link to='/'>
                        <Button className='w-[284px] h-[53px]' variant={ButtonVariant.outline}>Главная</Button>
                    </Link>
                </div>
            </div>


        </>
    );
};

export default RefundPage;