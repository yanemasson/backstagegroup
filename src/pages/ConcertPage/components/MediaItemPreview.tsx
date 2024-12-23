
interface MediaItemPreviewProps {
    src: string
    onClick: (index: number) => void;
    index: number;
}
const MediaItemPreview = ({src, onClick, index}:MediaItemPreviewProps) => {
    return (
        <div className='w-[160px] h-[160px] md:w-[320px] md:h-[320px] xl:w-[380px] xl:h-[380px] overflow-hidden cursor-zoom-in'>
            <img onClick={() => onClick(index)} alt={src} className='w-full h-full object-cover' src={src}/>
        </div>
    );
};

export default MediaItemPreview;