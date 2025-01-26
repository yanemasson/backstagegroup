
interface DownArrowProps {
    hover?: boolean
    color?: 'black' | 'yellow' | 'white'
    hoverColor?: 'black' | 'yellow' | 'white'
}


const DownArrow = ({hover = false, color = 'white', hoverColor = 'yellow'}:DownArrowProps) => {
    return (
        <div className={`w-3 h-3 border-solid border-r-0 border-t-0 border-l-3 border-b-3 border-${color}
            transition-all absolute -rotate-45 ${hover && `border-${hoverColor}`}`}/>
    );
};

export default DownArrow;