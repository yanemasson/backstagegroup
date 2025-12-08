import Text, {TextVariant} from "../../components/Text.tsx";
import Button, {ButtonSize, ButtonVariant} from "../../components/Buttons/Button.tsx";
import {Link} from "react-router";
import {SEO} from "../../components/SEO.tsx";

const NotFoundPage = () => {
    return (
        <>
            <SEO title={'404 | Страница не найдена'}
                 description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                "Классическая музыка, премьеры в Вашем городе"}/>
            <div className='flex flex-col items-center justify-center gap-5 h-screen text-9xl font-extrabold '>
                <div className='text-text-accent'>404</div>
                <Text className='text-text-secondary' variant={TextVariant.Body_L}>Такой страницы не существует</Text>
                <Link to={'/'}>
                    <Button className='h-[45px] w-[200px]' size={ButtonSize.large} variant={ButtonVariant.secondary}>
                        Главная
                    </Button>
                </Link>
            </div>
        </>

    );
};

export default NotFoundPage;