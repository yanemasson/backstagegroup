import Text, {TextVariant} from "../../components/Text.tsx";
import Button, {ButtonVariant} from "../../components/Button.tsx";
import {Link} from "react-router";

const NotFoundPage = () => {
    return (
        <div className=' flex flex-col items-center justify-center gap-5 h-screen text-9xl text-white font-extrabold bg-black'>
            404
            <Text variant={TextVariant.P}>Такой страницы не существует</Text>
            <Link to={'/'}><Button variant={ButtonVariant.outline}><Text variant={TextVariant.P}>Главная</Text></Button></Link>
        </div>
    );
};

export default NotFoundPage;