

const YandexMusic = ({playlist}: {playlist: string}) => {
    return (
        <div className='bg-black  text-white py-20 px-5 lg:px-40'>
            <iframe className='w-full h-[450px]' allow="clipboard-write" src={playlist}/>
        </div>
    );
};

export default YandexMusic;