import IconButton, {IconButtonSize, IconButtonVariant} from "./IconButton.tsx";
import LeftArrowIcon from "../../assets/icons/arrows/ic_arrow_left.svg?react"
import RightArrowIcon from "../../assets/icons/arrows/ic_arrow_right.svg?react"

interface HorizontalScrollButtonProps {
    onLeftClick: () => void;
    onRightClick: () => void;
    canScrollLeft: boolean;
    canScrollRight: boolean;
}

const HorizontalScrollButton = ({onLeftClick, onRightClick, canScrollLeft, canScrollRight }: HorizontalScrollButtonProps) => {
    return (
        <div className='flex gap-3'>
            <IconButton
                variant={IconButtonVariant.FilledSecondary}
                size={IconButtonSize.small}
                onClick={onLeftClick}
                disabled={!canScrollLeft}
                aria-label="Прокрутить влево"
            >
                <LeftArrowIcon/>
            </IconButton>

            <IconButton
                variant={IconButtonVariant.FilledSecondary}
                size={IconButtonSize.small}
                onClick={onRightClick}
                disabled={!canScrollRight}
                aria-label="Прокрутить вправо"
            >
                <RightArrowIcon/>
            </IconButton>
        </div>
    );
};

export default HorizontalScrollButton;