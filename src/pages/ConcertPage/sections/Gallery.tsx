import {useState} from "react";
import MediaItemPreview from "../components/MediaItemPreview.tsx";
import Slider from "../components/Slider.tsx";

interface GalleryProps {
    photos: string[]
}
const Gallery = ({photos} : GalleryProps) => {
    const [index, setIndex] = useState(0)
    const [isOpenSlider, setIsOpenSlider] = useState(false)

    const toggleSlider = (index:number) => {
        setIndex(index)
        setIsOpenSlider(!isOpenSlider)
    }

    return (
        <section id='media' className='bg-black px-5 lg:px-40 bg-gray-100 p-10 flex flex-col gap-10 items-center justify-center '>
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-5'>
                {photos.map(((item, index) => (<MediaItemPreview key={item} onClick={toggleSlider} index={index} src={item}/>)))}
            </div>
            <Slider mediaItems={photos} index={index} isOpenSlider={isOpenSlider} setIsOpenSlider={setIsOpenSlider}/>
        </section>
    );
};

export default Gallery;