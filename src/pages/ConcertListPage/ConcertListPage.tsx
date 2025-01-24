import ConcertCard from "../../components/ConcertCard.tsx";
import useConcerts from "../../hooks/useConcerts.ts";
import {SEO} from "../../components/SEO.tsx";

const ConcertListPage = () => {
    const {concerts} = useConcerts()

    const createSlug = (title: string, city: string) => {
        return `${title}_${city}`
            .toLowerCase()
            .replace(/[^a-zа-яё0-9-\s]/g, '')
            .replace(/\s+/g, '_')
            .replace(/-+/g, '_');
    };

    return (
        <>
            <SEO
                title="Все концерты | Бэкстейдж, афиша, концерт, билеты'>"
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <section id='list' className='flex flex-col gap-10 lg:gap-40 px-5 py-20 lg:px-40 bg-black text-white'>
                {concerts.map((item, index) => (
                    <ConcertCard
                        key={index}
                        item={item}
                        index={index}
                        to={createSlug(item.title, item.city)}
                    />
                ))}
            </section>
        </>

    );
};

export default ConcertListPage;
