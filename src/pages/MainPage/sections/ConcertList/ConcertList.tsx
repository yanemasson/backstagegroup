import ConcertCard from "./components/ConcertCard.tsx";
import { ConcertListData } from "../../../../data/concertListData.ts"

const ConcertList = () => {
    return (
        <section className='flex flex-col gap-40 px-5 py-20 lg:px-40 bg-black text-white'>
            {ConcertListData.map((item, index) => <ConcertCard
                key={index} title={item.title} descriptionShort={item.descriptionShort}
                date={item.date} poster={item.poster} city={item.city} location={item.location}
                isEven={index % 2 == 0}/>)}
        </section>
    );
};

export default ConcertList;