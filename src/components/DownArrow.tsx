interface ArrowProps {
    index: number
}

const DownArrow = ({index}:ArrowProps) => {
    return (
        <div className={`w-3 h-3 border-solid border-r-0 border-t-0 border-l-3 border-b-3 translate-y-2
        -rotate-45 ${index % 2 === 0 ? 'border-yellow' : 'border-red'}`}/>
    );
};

export default DownArrow;