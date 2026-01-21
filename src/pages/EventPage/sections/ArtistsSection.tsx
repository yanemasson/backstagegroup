import Text, {TextVariant} from "../../../components/Text.tsx";
import {Artist} from "../../../types/event.ts";
import ArtistCard from "../components/ArtistCard.tsx";

interface ArtistsSectionProps {
    artists: Artist[];
    artistsTeam?: string;
    artistsGroupPhoto?: string;
}

const ArtistsSection = ({artists, artistsTeam, artistsGroupPhoto}: ArtistsSectionProps) => {

    if (artists.length === 0 && !artistsGroupPhoto) {
        return <Text className='text-text-tertiary' variant={TextVariant.Body_M}>
            Информация об исполнителях появится в ближайшее время. Следите за обновлениями
        </Text> ;
    }

    return (
        <section className='flex flex-col gap-6' id='artists'>

            <Text variant={TextVariant.Subtitle_L}>{artistsTeam ? artistsTeam : 'Музыканты'}</Text>

            {artistsGroupPhoto &&
                <div className='flex flex-col gap-[15px] xl:gap-5'>
                    <img src={artistsGroupPhoto} alt={artistsGroupPhoto} />
                </div>
            }

            {artists.length > 0 &&
                <div className='w-full grid grid-cols-2 gap-y-8 md:flex md:flex-wrap md:gap-3'>
                    {artists.map((item) => (
                        <ArtistCard name={item.name} key={item.name} photo={item.photo} role={item.role} />
                    ))}
                </div>
            }

        </section>
    );
};

export default ArtistsSection;