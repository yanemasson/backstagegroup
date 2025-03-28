import Text, {TextVariant} from "../../../components/Text.tsx";
import {Artist} from "../../../types/event.ts";

interface ArtistsSectionProps {
    artists: Artist[];
    artistsTeam?: string;
}

const ArtistsSection = ({artists, artistsTeam}: ArtistsSectionProps) => {
    return (
        <section className='flex flex-col gap-[44px]' id='artists'>
            <div className='leading-none'>
                <Text variant={TextVariant.H2}>ИСПОЛНИТЕЛИ</Text>
                {artistsTeam && <Text className='text-light-brown' variant={TextVariant.H2}>{artistsTeam?.toUpperCase()}</Text>}
            </div>

            <div className='flex flex-col gap-[30px] xl:gap-10'>
                <Text className='text-light-brown' variant={TextVariant.H4}>Музыканты</Text>
                <div className='grid grid-cols-2 gap-x-2.5 gap-y-5 xl:flex'>
                    {artists.filter((item: Artist) => item.role !== 'Вокал').map((item) => (
                        <div className='flex flex-col gap-2.5 xl:gap-5'>
                            <div className='w-full pb-[100%] relative'>
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

            <div className='flex flex-col gap-[30px] xl:gap-10'>
                <Text className='text-light-brown' variant={TextVariant.H4}>Вокалисты</Text>
                <div className='grid grid-cols-2 gap-x-2.5 gap-y-5 xl:flex'>
                    {artists.filter((item: Artist) => item.role === 'Вокал').map((item) => (
                        <div className='flex flex-col gap-2.5 xl:gap-5'>
                            <div className='w-full pb-[100%] relative'>
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
        </section>
    );
};

export default ArtistsSection;