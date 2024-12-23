import Text, {TextVariant} from "../../../../../components/Text.tsx";
import Button, {ButtonVariant} from "../../../../../components/Button.tsx";

interface ConcertCardProps {
    title: string,
    descriptionShort: string,
    date: Date,
    location: string,
    city: string,
    poster: string,
    isEven: boolean
}
const ConcertCard = ({title, descriptionShort, date, location, city, poster, isEven}: ConcertCardProps) => {

    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

    const getDate = (date:Date)=> {
        const dateString = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ', '
        const timeString = 'в ' + date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes()
        return dateString + timeString
    }

    return (
        <div className='flex gap-40 justify-between'>
            <img className='w-1/4 shadow-white' alt={poster} src={poster}/>
            <div className='flex flex-col gap-10'>
                <div>
                    <div className={`${isEven ? 'text-yellow' : 'text-red'}`}>
                        <Text variant={TextVariant.H1}>{title}</Text>
                    </div>
                    <div>
                        <Text variant={TextVariant.H3}>{city}, {location}</Text>
                        <Text variant={TextVariant.H3}>{getDate(date)}</Text>
                    </div>
                </div>
                <Text variant={TextVariant.P}>{descriptionShort}</Text>
                <div className='flex gap-5'>
                    <Button variant={ButtonVariant.white}>Бронь билета</Button>
                    <Button variant={ButtonVariant.white}>Узнать больше</Button>
                </div>
            </div>
        </div>
    );
};

export default ConcertCard;