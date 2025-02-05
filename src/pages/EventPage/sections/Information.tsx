import Text, {TextVariant} from "../../../components/Text.tsx";
import {Event} from "../../../types/event.ts";
import {getDate} from "../../../utils/getDate.ts";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import TicketButtonsGroup from "./TicketButtonsGroup.tsx";
import {getDatesString} from "../../../utils/getDatesString.ts";
import MoreButton from "../../../components/Buttons/MoreButton.tsx";

interface InformationProps {
    item: Event
}

const Information = (({item}:InformationProps) => {
    return (
        <section className='flex flex-col bg-black text-white px-5 lg:px-40 gap-20'>
            <div className='flex flex-col lg:flex-row pt-20 gap-5 xl:gap-16 '>
                <img className='xl:w-1/3 xl:h-1/3 md:w-1/2 md:h-1/2 shadow-white/10 shadow-sm rounded'
                     alt={item.poster} src={item.poster}/>
                <div className='flex flex-col gap-10'>
                    <div>
                        <Text variant={TextVariant.H1}>{item.title}</Text>
                        <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                        {item.concerts.length > 1
                            ? <Text variant={TextVariant.H3}>{getDatesString(item.concerts)}</Text>
                            : <Text variant={TextVariant.H3}>{getDate(item.concerts[0].date)}</Text>
                        }
                    </div>
                    <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                    <div className='flex lg:flex-row w-full flex-col items-center gap-5'>
                        {item.concerts.length > 1
                            ? <TicketButtonsGroup concerts={item.concerts}/>
                            : <>
                                <TicketButton eventId={item.concerts[0].eventId}/>
                                <MoreButton/>
                            </>
                        }
                    </div>
                </div>
            </div>
        </section>

    );
})
export default Information;