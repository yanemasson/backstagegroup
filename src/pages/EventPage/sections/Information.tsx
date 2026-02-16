import Text, {TextVariant} from "../../../components/Text.tsx";
import {InformationItem} from "../../../types/events/information_item.ts";

const Information = ({information} : {information: InformationItem[]}) => {
    return (
        <section className='flex flex-col gap-11' id='description'>
            {information.map((item) => (
                <div className='flex xl:flex-row flex-col gap-6' key={item.title}>
                    <img className='xl:min-w-[667px] xl:max-h-[426px] min-w-[90vw] overflow-hidden' alt={item.photo} src={item.photo}/>
                    <div className='flex flex-col gap-3 justify-center' >
                        <Text variant={TextVariant.Subtitle_L} className='text-text-accent'>{item.title}</Text>
                        <Text variant={TextVariant.Body_L} >{item.text}</Text>
                    </div>
                </div>
                )
            )}
        </section>
    );
};

export default Information;