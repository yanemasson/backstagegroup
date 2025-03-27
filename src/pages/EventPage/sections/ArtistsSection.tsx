import Text, {TextVariant} from "../../../components/Text.tsx";
import {Artist} from "../../../types/event.ts";

interface ArtistsSectionProps {
    artists: Artist[];
    artistsTeam?: string;
}

const ArtistsSection = ({artists, artistsTeam}: ArtistsSectionProps) => {
    return (
        <section className='flex flex-col gap-[44px]' id='artists'>
            <div>
                <Text variant={TextVariant.H2}>ИСПОЛНИТЕЛИ</Text>
                {artistsTeam && <Text className='text-light-brown' variant={TextVariant.H2}>{artistsTeam?.toUpperCase()}</Text>}
            </div>

            <div className='flex flex-col gap-10'>
                <Text className='text-light-brown' variant={TextVariant.H4}>Музыканты</Text>
                <div className='grid grid-cols-2 gap-2.5 xl:flex xl:gap-3'>
                    {artists.filter((item: Artist) => item.role != 'Вокал').map((item) => (
                        <div className='flex flex-col gap-5'>
                            <img className='h-[155px] w-[155px] xl:h-[224px] xl:w-[224px]' alt={item.photo} src={item.photo}/>
                            <div>
                                <Text variant={TextVariant.P}>{item.name}</Text>
                                <Text className='text-lightgray' variant={TextVariant.CAPTION}>{item.role}</Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-10'>
                <Text className='text-light-brown' variant={TextVariant.H4}>Вокалисты</Text>
                <div className='grid grid-cols-2 gap-2.5 xl:flex xl:gap-3'>
                    {artists.filter((item: Artist) => item.role === 'Вокал').map((item) => (
                        <div className='flex flex-col gap-5'>
                            <img className='h-[155px] w-[155px] xl:h-[224px] xl:w-[224px]' alt={item.photo} src={item.photo}/>
                            <div>
                                <Text variant={TextVariant.P}>{item.name}</Text>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ArtistsSection;