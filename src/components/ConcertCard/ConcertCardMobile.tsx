import {useState} from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import {Concert} from "../../types/concert.ts";
import Text, {TextVariant} from "../Text.tsx";
import TicketButton from "../TicketButton.tsx";
import Button, {ButtonVariant} from "../Button.tsx";
import {Link} from "react-router-dom";
import {getDate} from "../../utils/getDate.ts";
import Slider from "../PhotoGallery/Slider.tsx";
import MediaItemPreview from "../PhotoGallery/MediaItemPreview.tsx";

interface ConcertCardProps {
    item: Concert,
    index: number,
    to: string
}
const ConcertCardMobile = ({item, index, to}: ConcertCardProps) => {
    const dateString = getDate(item.date)
    const [isOpen, setIsOpen] = useState(false)
    const [indexPhoto, setIndexPhoto] = useState(0)
    const [isOpenSlider, setIsOpenSlider] = useState(false)

    const toggleSlider = (index:number) => {
        setIndexPhoto(index)
        setIsOpenSlider(!isOpenSlider)
    }

    return (
        <div className={`border-white border-solid rounded-2xl p-4 transition-all flex flex-col items-start text-start
        gap-1 justify-between`} onClick={() => setIsOpen(!isOpen)}>
            <div className={`flex flex-row ${index % 2 === 0 ? 'text-yellow' : 'text-red'}`}>
                <Text variant={TextVariant.H2}>{item.title}</Text>
            </div>
            <Text variant={TextVariant.H3}>{dateString}</Text>
            <div className={`flex flex-col gap-10 transition-all duration-300 ease-out overflow-hidden ${
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                {(item.videos && item.videos.length > 0)
                    ? <VideoPlayer videos={item.videos}/>
                    : <img className='xl:w-1/4 xl:h-1/4 md:w-1/2 md:h-1/2 shadow-white' alt={item.poster} src={item.poster}/>
                }
                {(item.photos && item.photos.length > 0) &&
                    <>
                        <div className='flex flex-col items-center text-gray gap-2'>
                            <MediaItemPreview src={item.photos[0]} onClick={toggleSlider} index={indexPhoto}/>
                            <Text variant={TextVariant.CAPTION}>Нажмите на фото, чтоб открыть галерею</Text>
                        </div>
                        <Slider mediaItems={item.photos} currentIndex={indexPhoto} setCurrentIndex={setIndexPhoto}
                                isOpenSlider={isOpenSlider} setIsOpenSlider={setIsOpenSlider}/>
                    </>
                }
                <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                <div className='flex lg:flex-row flex-col items-center gap-5'>
                    {item.eventId != 0
                        ? <TicketButton eventId={item.eventId}/>
                        : <Button variant={ButtonVariant.outline}>Пока недоступно</Button>
                    }
                    <Link className='self-center' to={`/events/${to}`}>
                        <Button variant={ButtonVariant.white}>Узнать больше</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ConcertCardMobile;