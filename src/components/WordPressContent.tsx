import parse, {DOMNode, domToReact, Element, HTMLReactParserOptions} from 'html-react-parser';
import Button, {ButtonVariant} from './Buttons/Button';
import Quote from './Quote';
import Text, {TextVariant} from "./Text.tsx";

interface WordPressContentProps {
    content: string;
    className?: string;
}

const WordPressContent = ({ content, className } : WordPressContentProps) => {
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element) {

                // Кнопка со ссылкой
                if ((domNode.name === 'div' && domNode.attribs.class?.includes('wp-block-button')) ||
                    (domNode.name === 'a' && (
                        domNode.attribs.class?.includes('wp-block-button__link') ||
                        domNode.attribs.class?.includes('wp-element-button')
                    ))
                ) {
                    return (
                        <div className="mb-4 last:mb-0">
                            <a href={domNode.attribs.href}>
                                <Button className='w-full md:w-[200px] h-[45px]' variant={ButtonVariant.primary}>
                                    {domToReact(domNode.children as DOMNode[], options)}
                                </Button>
                            </a>
                        </div>
                    );
                }

                // Разделитель
                if ((domNode.name === 'hr' && domNode.attribs.class?.includes('wp-block-separator'))) {
                    return (
                        <div className="h-[2px] w-full bg-divider-accent mb-4 last:mb-0"></div>
                    );
                }

                // Изображение
                if (domNode.name === 'img') {
                    return (
                        <img
                            src={domNode.attribs.src}
                            alt={domNode.attribs.alt || ''}
                            className="mb-4"
                            loading="lazy"
                        />
                    );
                }

                // Параграф
                if (domNode.name === 'p') {
                    return (
                        <Text variant={TextVariant.Body_L} className="mb-4 last:mb-0 whitespace-pre-wrap">
                            {domToReact(domNode.children as DOMNode[], options)}
                        </Text>
                    );
                }

                //Заголовки
                if (domNode.name === 'h2' || domNode.name === 'h3' || domNode.name === 'h4' || domNode.name === 'h5') {
                    const headingMap = {
                        'h2': TextVariant.H2,
                        'h3': TextVariant.Subtitle_L,
                        'h4': TextVariant.Subtitle_M,
                        'h5': TextVariant.Subtitle_S,
                    };
                    const variant = headingMap[domNode.name];
                    return (
                        <Text
                            variant={variant}
                            className="mb-4 last:mb-0 text-text-accent"
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </Text>
                    );
                }

                // Список
                if (domNode.name === 'ol' || domNode.name === 'ul') {
                    return (
                        <ul className="list-none mb-4">
                            {domToReact(domNode.children as DOMNode[], options)}
                        </ul>
                    );
                }
                if (domNode.name === 'li') {
                    return (
                        <li className="relative pl-5 mb-2">
                            <div className="absolute left-0 top-1.5">
                                <svg
                                    className='text-text-accent'
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                >
                                    <path d="M0,0 H8 V8 H0 Z" fill="currentColor"/>
                                </svg>
                            </div>

                            <Text variant={TextVariant.Body_L}>
                                {domToReact(domNode.children as DOMNode[], options)}
                            </Text>
                        </li>
                    );
                }

                // Цитата
                if (domNode.name === 'blockquote') {
                    return (
                        <Quote className='mb-4 last:mb-0'>
                            {domToReact(domNode.children as DOMNode[], options)}
                        </Quote>
                    );
                }
            }
        }
    };

    return (
        <div className={className}>
            {parse(content, options)}
        </div>
    );
};

export default WordPressContent;