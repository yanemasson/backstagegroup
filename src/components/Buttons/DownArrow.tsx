interface DownArrowProps {
    hover?: boolean
}


const DownArrow = ({hover = false}:DownArrowProps) => {
    return (
        <div
            className={`w-3 h-3 border-solid border-r-0 border-t-0 border-l-3 border-b-3 border-white transition-all 
                absolute -rotate-45 ${hover && 'border-yellow'}`}
        />
    );
};

export default DownArrow;