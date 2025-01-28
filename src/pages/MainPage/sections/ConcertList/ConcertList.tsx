import ConcertCardDesktop from "../../../../components/ConcertCard/ConcertCardDesktop.tsx";
import Text, {TextVariant} from "../../../../components/Text.tsx";
import {Link} from "react-router";
import Button, {ButtonVariant} from "../../../../components/Button.tsx";
import {useConcerts} from "../../../../hooks/cms/useConcerts.ts";
import {useMediaBreakpoint} from "../../../../hooks/useMediaBreakpoint.ts";
import ConcertCardMobile from "../../../../components/ConcertCard/ConcertCardMobile.tsx";

const ConcertList = () => {
/*
    const { selectedCity } = useCity();
*/
    const {concerts} = useConcerts()
    const lg =  useMediaBreakpoint('lg')
    const selectedCity = 'Красноярск'
    const filteredConcerts = concerts.filter(item => item.city === selectedCity);
    const createSlug = (title: string, city: string) => {
        return `${title}_${city}`
            .toLowerCase()
            .replace(/[^a-zа-яё0-9-\s]/g, '')
            .replace(/\s+/g, '_')
            .replace(/-+/g, '_');
    };

    return (
        <section id='list' className='flex flex-col gap-10 lg:gap-40 px-5 py-20 lg:px-40 bg-black text-white'>
            {filteredConcerts.length > 0 ? (
                filteredConcerts.map((item, index) => (
                    lg
                        ? <ConcertCardDesktop key={index} item={item} index={index} to={createSlug(item.title, item.city)}/>
                        : <ConcertCardMobile key={index} item={item} index={index} to={createSlug(item.title, item.city)}/>
                    )
                )
            ) : (
                <div className="flex flex-col items-center justify-center gap-5 py-20">
                    <Text variant={TextVariant.B}>В городе {selectedCity} пока нет концертов</Text>
                    <Text variant={TextVariant.P}>Выберите другой город или следите за обновлениями</Text>
                    <Link to={'events'}>
                        <Button variant={ButtonVariant.outline}>
                            <Text variant={TextVariant.P}>Все концерты</Text>
                        </Button>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default ConcertList;