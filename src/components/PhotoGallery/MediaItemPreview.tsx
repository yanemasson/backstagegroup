
interface MediaItemPreviewProps {
    src: string
    onClick: (index: number) => void;
    index: number;
    isLil?: boolean
}
const MediaItemPreview = ({src, onClick, index, isLil = false}:MediaItemPreviewProps) => {
    return (
        <div className={`overflow-hidden cursor-zoom-in
        ${isLil ? 'w-[210px] h-[210px]' : 'w-[210px] h-[210px] md:w-[320px] md:h-[320px] xl:w-[380px] xl:h-[380px]'}`}>
            <img onClick={() => onClick(index)} alt={src} className='w-full h-full object-cover' src={src}/>
        </div>
    );
};

export default MediaItemPreview;