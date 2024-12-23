import ConcertCard from "../../../../components/ConcertCard.tsx";
import { ConcertListData } from "../../../../data/concertListData.ts"

interface ConcertListProps {
    city: string
}

const ConcertList = ({city}:ConcertListProps) => {
    return (
        <section id='list' className='flex flex-col gap-40 px-5 py-20 lg:px-40 bg-black text-white'>
            {ConcertListData.filter((item) => {return item.city == city}).map((item, index) =>
                <ConcertCard
                    key={index} to={`events/${index}`} title={item.title} descriptionShort={item.descriptionShort} index={index}
                    date={item.date} poster={item.poster} city={item.city} location={item.location}

                />)
            }
        </section>
    );
};

export default ConcertList;