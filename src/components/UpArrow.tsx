interface ArrowProps {
    index: number
}

const UpArrow = ({index}:ArrowProps) => {
    return (
        <div className={`w-3 h-3 border-solid border-r-3 border-t-3 border-l-0 border-b-0 translate-y-4
        -rotate-45 ${index % 2 === 0 ? 'border-yellow' : 'border-red'}`}/>
    );
};

export default UpArrow;