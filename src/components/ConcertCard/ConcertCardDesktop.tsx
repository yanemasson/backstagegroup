import Text, {TextVariant} from "../Text.tsx";
import Button, {ButtonVariant} from "../Button.tsx";
import {useDate} from "../../hooks/useDate.ts";
import {Link} from "react-router-dom";
import TicketButton from "../TicketButton.tsx";
import {useState} from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import {Concert} from "../../types/concert.ts";
import MediaItemPreview from "../PhotoGallery/MediaItemPreview.tsx";
import Slider from "../PhotoGallery/Slider.tsx";

interface ConcertCardProps {
    item: Concert,
    index: number,
    to: string
}
const ConcertCardDesktop = ({item, index, to}: ConcertCardProps) => {
    const dateString = useDate(item.date)
    const [indexPhoto, setIndexPhoto] = useState(0)
    const [isOpenSlider, setIsOpenSlider] = useState(false)

    const toggleSlider = (index:number) => {
        setIndexPhoto(index)
        setIsOpenSlider(!isOpenSlider)
    }

    return (
        <div className='flex items-start text-start flex-row gap-5 xl:gap-16 justify-between'>
            <img className='xl:w-2/5 xl:h-2/5 md:w-1/2 md:h-1/2 shadow-white/10 shadow-sm rounded'
                 alt={item.poster} src={item.poster}/>
            <div className='flex flex-col gap-10'>
                <div>
                    <div className={`${index % 2 === 0 ? 'text-yellow' : 'text-red'}`}>
                        <Text variant={TextVariant.H2}>{item.title}</Text>
                    </div>
                    <div>
                        <Text variant={TextVariant.H3}>{dateString}</Text>
                        <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                    </div>
                </div>
                <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                {(item.videos && item.videos.length > 0)
                    ? <div className='w-2/3'><VideoPlayer videos={item.videos}/></div>
                    : (item.photos && item.photos.length > 0) &&
                        <div className='flex gap-5'>
                            {item.photos.slice(0, 3).map((value, index) =>
                                <MediaItemPreview key={value} src={value} onClick={toggleSlider}
                                                  isLil={true} index={index}/>)
                            }
                            <Slider mediaItems={item.photos} currentIndex={indexPhoto} setCurrentIndex={setIndexPhoto}
                                    isOpenSlider={isOpenSlider} setIsOpenSlider={setIsOpenSlider}/>
                    </div>
                }
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

export default ConcertCardDesktop;