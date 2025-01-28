import Text, {TextVariant} from "../../../components/Text.tsx";
import Button, {ButtonVariant} from "../../../components/Button.tsx";
import {Concert} from "../../../types/concert.ts";
import {getDate} from "../../../utils/getDate.ts";
import TicketButton from "../../../components/TicketButton.tsx";
import DownArrow from "../../../components/DownArrow.tsx";

interface InformationProps {
    item: Concert
}

const Information = (({item}:InformationProps) => {
    return (
        <section className='flex flex-col bg-black text-white px-5 lg:px-40 gap-20'>
            <div className='flex flex-col lg:flex-row pt-20 lg:gap-16 justify-between '>
                <img className='xl:w-1/3 xl:h-1/3 md:w-1/2 md:h-1/2 shadow-white/10 shadow-sm rounded'
                     alt={item.poster} src={item.poster}/>
                <div className='flex flex-col gap-10'>
                    <div>
                        <Text variant={TextVariant.H1}>{item.title}</Text>
                        <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                        <Text variant={TextVariant.H3}>{getDate(item.date)}</Text>
                    </div>
                    <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                    <div className='flex lg:flex-row flex-col items-center gap-5'>
                        {item.eventId != 0
                            ? <TicketButton eventId={item.eventId}/>
                            : <Button variant={ButtonVariant.outline}>Пока недоступно</Button>
                        }
                        <a className='self-center' href={'#information'}>
                            <Button variant={ButtonVariant.white}>
                                <div className='flex items-center justify-center gap-5'>
                                    Подробнее
                                    <div className={'-translate-y-2'}>
                                        <DownArrow hover={true} color={'black'} hoverColor={'black'}/>
                                    </div>
                                </div>
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>

    );
})
export default Information;