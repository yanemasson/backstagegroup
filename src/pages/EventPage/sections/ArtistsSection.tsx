import Text, {TextVariant} from "../../../components/Text.tsx";
import {Artist} from "../../../types/event.ts";

interface ArtistsSectionProps {
    artists: Artist[];
    artistsTeam?: string;
}

const ArtistsSection = ({artists, artistsTeam}: ArtistsSectionProps) => {
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

            {musicians.length > 0 &&
                <div className='flex flex-col gap-[30px] xl:gap-10'>
                    <Text className='text-light-brown' variant={TextVariant.H4}>Музыканты</Text>
                    <div className='grid grid-cols-2 gap-x-2.5 gap-y-5 xl:flex xl:flex-wrap xl:gap-[12px]'>
                        {musicians.map((item) => (
                            <div key={`${item.name}-${item.role}-desktop`} className='flex flex-col gap-2.5 xl:gap-5'>
                                <div className='relative w-full pb-[100%] xl:w-[223px] xl:h-[223px] xl:pb-0'>
                                    <img
                                        className='absolute top-0 left-0 w-full h-full object-cover'
                                        alt={item.photo}
                                        src={item.photo}
                                    />
                                </div>
                                <div className='flex flex-col gap-[5px]'>
                                    <Text variant={TextVariant.P}>{item.name}</Text>
                                    <Text className='text-lightgray' variant={TextVariant.CAPTION}>{item.role}</Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {vocals.length > 0 &&
                <div className='flex flex-col gap-[30px] xl:gap-10'>
                    <Text className='text-light-brown' variant={TextVariant.H4}>Вокалисты</Text>
                    <div className='grid grid-cols-2 gap-x-2.5 gap-y-5 xl:flex xl:flex-wrap xl:gap-[12px]'>
                        {vocals.map((item) => (
                            <div key={`${item.name}-${item.role}-mobile`} className='flex flex-col gap-2.5 xl:gap-5'>
                                <div className='relative w-full pb-[100%] xl:w-[223px] xl:h-[223px] xl:pb-0'>
                                    <img
                                        key={item.name}
                                        className='absolute top-0 left-0 w-full h-full object-cover'
                                        alt={item.photo}
                                        src={item.photo}
                                    />
                                </div>
                                <div className='flex flex-col gap-[5px]'>
                                    <Text variant={TextVariant.P}>{item.name}</Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }

        </section>
    );
};

export default ArtistsSection;