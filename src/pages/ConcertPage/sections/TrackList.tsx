import {Track} from "../../../types/concert.ts";
import Text, {TextVariant} from "../../../components/Text.tsx";

const TrackList = ({trackList} : {trackList: Track[] | string}) => {
    return (
        <div className='bg-black  text-white py-20 px-5 lg:px-40'>
            {typeof(trackList) === "string"
                ? <iframe className='w-full h-[450px]' allow="clipboard-write" src={trackList}/>
                : <div className='border-white border-solid rounded-3xl shadow-white shadow-sm p-5'>
                    <Text variant={TextVariant.B}>Треклист:</Text>
                        {trackList.map((item, index) =>
                            <div className='flex flex-col'>
                                <Text variant={TextVariant.P}>{index + 1}. {item.musician} — {item.composition}</Text>
                            </div>
                        )}
            </div>}
        </div>
    );
};

export default TrackList;