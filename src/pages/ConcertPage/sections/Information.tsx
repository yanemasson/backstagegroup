import Text, {TextVariant} from "../../../components/Text.tsx";
import Button, {ButtonVariant} from "../../../components/Button.tsx";
import {Concert} from "../../../types/concert.ts";

interface InformationProps {
    item: Concert
}

const Information = (({item}:InformationProps) => {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const getDate = (date:Date)=> {
        const dateString = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ', '
        const timeString = 'в ' + date.getHours() + ':' + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes()
        return dateString + timeString
    }
    return (
        <div className='flex flex-row gap-40 px-5 py-20 lg:px-40 bg-black text-white'   >
            <img className='w-1/4 shadow-white' alt={item.poster} src={item.poster}/>
            <div className='flex flex-col gap-10'>
                <div>
                    <Text variant={TextVariant.H1}>{item.title}</Text>
                    <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                    <Text variant={TextVariant.H3}>{getDate(item.date)}</Text>
                </div>
                <Text variant={TextVariant.P}>{item.descriptionFull}</Text>
                <div className='flex gap-5'>
                    <Button variant={ButtonVariant.white}>Бронь билета</Button>
                </div>
            </div>
        </div>
    );
})
export default Information;