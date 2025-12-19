interface StatusBarProps {
    progress: number;
    className?: string;
    isActive: boolean;
    onClick?: () => void;
}

const StatusBar = ({progress, className, isActive}: StatusBarProps) => {
    return (
        <div
            className={`w-full h-[2px] bg-divider-default rounded-full overflow-hidden ${className}`}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            onClick={() => {}}
        >
            <div
                className={`h-full transition-all duration-300 ease-out ${isActive ? 'bg-divider-accent' : ''}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
        </div>
    );
};

export default StatusBar;