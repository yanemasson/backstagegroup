import Text, {TextVariant} from "./Text.tsx";
import Button, {ButtonVariant} from "./Button.tsx";
import {getDate} from "../functions/getDate.ts";
import {Link} from "react-router";

interface ConcertCardProps {
    index: number,
    to: string,
    title: string,
    descriptionShort: string,
    date: Date,
    location: string,
    city: string,
    poster: string
}
const ConcertCard = ({index, to, title, descriptionShort, date, location, city, poster}: ConcertCardProps) => {

    return (
        <div className='flex flex-col lg:flex-row lg:gap-40 justify-between'>
            <img className='lg:w-1/4 shadow-white' alt={poster} src={poster}/>
            <div className='flex flex-col gap-10'>
                <div>
                    <div className={`${index % 2 === 0 ? 'text-yellow' : 'text-red'}`}>
                        <Text variant={TextVariant.H1}>{title}</Text>
                    </div>
                    <div>
                        <Text variant={TextVariant.H3}>{city}, {location}</Text>
                        <Text variant={TextVariant.H3}>{getDate(date)}</Text>
                    </div>
                </div>
                <Text variant={TextVariant.P}>{descriptionShort}</Text>
                <div className='flex lg:flex-row flex-col gap-5'>
                    <Button variant={ButtonVariant.white}>Бронь билета</Button>
                    <Link className='self-center' to={to}><Button variant={ButtonVariant.white}>Узнать больше</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default ConcertCard;