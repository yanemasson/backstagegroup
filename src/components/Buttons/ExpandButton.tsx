import Text, {TextVariant} from "../Text.tsx";

interface ExpandButtonProps {
    onClick?: () => void;
    isOpen: boolean;
    full?: boolean;
}

const ExpandButton = ({onClick, isOpen, full = true}: ExpandButtonProps) => {
    return (
        <button
            aria-label={isOpen ? "Свернуть" : 'Развернуть'}
            aria-pressed={isOpen ? "false" : "true"}
            onClick={onClick}>
            <Text
                className='flex gap-1.5 items-center text-lightgray
                hover:text-light-brown focus:text-light-brown transition-colors duration-100'
                variant={TextVariant.CAPTION}
            >
                {full &&
                    <>
                    {!isOpen ? <>Развернуть</> : <>Свернуть</>}
                    </>
                }
                <svg className={`${isOpen ? 'rotate-180' : ''}`} width="12" height="9"
                     viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L0 0H12L6 9Z" fill="currentColor" />
                </svg>
            </Text>
        </button>
    );
};

export default ExpandButton;