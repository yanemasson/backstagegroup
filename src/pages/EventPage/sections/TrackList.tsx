import {Track} from "../../../types/events/track.ts";
import Text, {TextVariant} from "../../../components/Text.tsx";

const TrackList = ({trackList} : {trackList: Track[]}) => {

    if (trackList.length === 0) return <Text className='text-lightgray' variant={TextVariant.Subtitle_S}>Трек-лист уточняется. Следите за обновлениями!</Text>;

    return (
        <section className='flex flex-col gap-6' id='tracklist'>
            {trackList.map((track: Track, index) => (
                <div className='flex flex-col gap-2' key={index}>
                    <Text variant={TextVariant.Subtitle_L}>
                        {`${index + 1}. ${track.title} ${track.source && ` из «${track.source}»`}`}
                    </Text>
                    <Text className='text-text-tertiary' variant={TextVariant.Body_S}>{track.artist}</Text>
                </div>
            ))}
        </section>
    );
};

export default TrackList;