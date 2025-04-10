import Text, {TextVariant} from "../../../components/Text.tsx";
import {Artist} from "../../../types/event.ts";
import ArtistCard from "../components/ArtistCard.tsx";

interface ArtistsSectionProps {
    artists: Artist[];
    artistsTeam?: string;
    artistsGroupPhoto?: string;
}

const ArtistsSection = ({artists, artistsTeam, artistsGroupPhoto}: ArtistsSectionProps) => {
    if (artists.length === 0) {
        return <Text className='text-lightgray' variant={TextVariant.CAPTION}>Состав исполнителей уточняется. Следите за обновлениями!</Text> ;
    }


    const musicians: Artist[] = artists.filter((item: Artist) => item.role !== 'Вокал')
    const vocals: Artist[] = artists.filter((item: Artist) => item.role === 'Вокал')

    return (
        <section className='flex flex-col gap-[44px]' id='artists'>
            <div className='leading-none'>
                <Text variant={TextVariant.H2}>ИСПОЛНИТЕЛИ</Text>
                {artistsTeam && <Text className='text-light-brown' variant={TextVariant.H2}>{artistsTeam?.toUpperCase()}</Text>}
            </div>

            {artists.length === 1 &&
                <div className='flex flex-col gap-[30px] xl:gap-10'>
                    {artistsGroupPhoto &&
                        <div className='flex flex-col gap-[15px] xl:gap-5'>
                            <Text className='text-light-brown' variant={TextVariant.H4}>Музыканты</Text>
                            <img src={artistsGroupPhoto} alt={artistsGroupPhoto} />
                        </div>
                    }
                    <div className='flex flex-col gap-[15px] xl:gap-5'>
                        <Text className='text-light-brown' variant={TextVariant.H4}>{artists[0].role}</Text>
                        <div className='grid grid-cols-2 gap-x-2.5 gap-y-5 xl:flex xl:flex-wrap xl:gap-[12px]'>
                            <ArtistCard name={artists[0].name} photo={artists[0].photo}/>
                        </div>
                    </div>
                </div>
            }

            {artists.length > 1 &&
                <div className='flex flex-col gap-[30px] xl:gap-10'>
                    <Text className='text-light-brown' variant={TextVariant.H4}>Музыканты</Text>
                    <div className='grid grid-cols-2 gap-x-2.5 gap-y-5 xl:flex xl:flex-wrap xl:gap-[12px]'>
                        {musicians.map((item) => (
                            <ArtistCard name={item.name} photo={item.photo} role={item.role} key={`${item.name}-${item.role}`} />
                        ))}
                    </div>
                </div>
            }

            {artists.length > 1 &&
                <div className='flex flex-col gap-[30px] xl:gap-10'>
                    <Text className='text-light-brown' variant={TextVariant.H4}>Вокалисты</Text>
                    <div className='grid grid-cols-2 gap-x-2.5 gap-y-5 xl:flex xl:flex-wrap xl:gap-[12px]'>
                        {vocals.map((item) => (
                            <ArtistCard name={item.name} photo={item.photo} key={`${item.name}-${item.role}`} />
                        ))}
                    </div>
                </div>
            }

        </section>
    );
};

export default ArtistsSection;