import Text, {TextVariant} from "../../components/Text.tsx";
import Button, {ButtonVariant} from "../../components/Buttons/Button.tsx";
import Anchor from "../../components/Anchor.tsx";
import {Link} from "react-router";

const PostponementPage = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 gap-10 max-w-[800px]">
            <Text className='text-light-brown' variant={TextVariant.H3}>Важное объявление о переносе мероприятия</Text>
            <Link to={'/events/2429995'} >
                <Button className='h-[45px] w-[300px]' variant={ButtonVariant.primary}>
                    Подробности мероприятия
                </Button>
            </Link>
            <table className="w-full border-collapse">
                <thead>
                <tr>
                    <th className="border-2 border-solid border-light-brown font-display text-light-brown px-4 py-3 text-left">
                        <Text variant={TextVariant.H4}>Старая дата и место</Text>
                    </th>
                    <th className="border-2 border-solid border-light-brown font-display text-light-brown px-4 py-3 text-left">
                        <Text variant={TextVariant.H4}>Новая дата и место</Text>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border-2 border-solid border-light-brown bg-gray-950 text-gray-100 px-4 py-3">
                        <Text variant={TextVariant.P}>13 ноября, Институт искусств</Text>
                    </td>
                    <td className="border-2 border-solid border-light-brown bg-gray-950 text-gray-100 px-4 py-3">
                        <Text variant={TextVariant.P}>21 ноября, Гранд холл Сибири</Text>
                    </td>
                </tr>
                </tbody>
            </table>

            <Text variant={TextVariant.P}>
                Дорогие зрители! Все билеты остаются действительными. Новые билеты уже отправлены на вашу электронную
                почту. Если у вас возникли вопросы или трудности, пожалуйста, пишите нам на <Anchor
                    href="mailto:support@backstagegroup.ru">support@backstagegroup.ru</Anchor>, и мы с радостью поможем!
            </Text>


        </div>
    );
};

export default PostponementPage;