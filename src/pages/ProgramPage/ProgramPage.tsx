import {lazy, Suspense, useEffect, useState} from "react";
import {DrupalAPI} from "../../api/drupal.ts";
import {useParams} from "react-router";
import {Program} from "../../types/events/program.ts";
import {Event} from "../../types/events/event.ts";
import {SEO} from "../../components/SEO.tsx";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx";
import Disclaimer from "../EventPage/sections/Disclaimer.tsx";
import ReviewsSection from "../MainPage/sections/Reviews/ReviewsSection";
import ProgramEvents from "./sections/ProgramEvents.tsx";
import {useCity} from "../../hooks/geolocation/useCity.ts";
import HeroDesktop from "./sections/HeroDesktop.tsx";
import HeroMobile from "./sections/HeroMobile.tsx";
import {useMediaBreakpoint} from "../../hooks/useMediaBreakpoint.ts";
import Text, {TextVariant} from "../../components/Text.tsx";
import Tab, {TabButtonSize} from "../../components/Tab.tsx";

const Information = lazy(() => import('../EventPage/sections/Information'));
const TrackList = lazy(() => import('../EventPage/sections/TrackList'));
const GallerySection = lazy(() => import('../EventPage/sections/Gallery'))

const ProgramPage = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [program, setProgram] = useState<Program | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const {selectedCity} = useCity();
    const md = useMediaBreakpoint('md')
    const xl = useMediaBreakpoint('xl')

    const [headerIsVisible, setHeaderIsVisible] = useState(false)

    //получаем программу
    useEffect(() => {
        const fetchProgram = async () => {
            if (!id) {
                setError('url не указан');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const programData = await DrupalAPI.getProgramByUrl(id);
                setProgram(programData);
                if (!programData) {
                    setError(`Программа ${id} не найдена`);
                }
            } catch (err) {
                console.error('Error loading program:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchProgram();
    }, [id]);

    //получаем ивенты
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);

                const eventsList = await DrupalAPI.getEventsByProgram(id, {upcomingOnly: true});

                setEvents(eventsList);
            } catch (err) {
                console.error('Error loading events:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [id]);

    //положение табов
    useEffect(() => {
        let ticking = false;
        let lastScrollY = 0;
        let hideTimeout: ReturnType<typeof setTimeout> | null = null;

        const controlNavbar = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const scrollDelta = currentScrollY - lastScrollY;
                    const isScrollingDown = scrollDelta > 0;
                    const isScrollingUp = scrollDelta < 0;

                    if (hideTimeout) {
                        clearTimeout(hideTimeout);
                    }

                    if (isScrollingDown && headerIsVisible && currentScrollY > 50) {
                        hideTimeout = setTimeout(() => {
                            setHeaderIsVisible(false);
                        }, 50);
                    } else if (isScrollingUp && !headerIsVisible) {
                        hideTimeout = setTimeout(() => {
                            setHeaderIsVisible(true);
                        }, 50);
                    }

                    if (currentScrollY < 50) {
                        if (hideTimeout) {
                            clearTimeout(hideTimeout);
                        }
                        setHeaderIsVisible(true);
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
        };
    }, [headerIsVisible]);

    type menuItemType = 'Описание программы' | 'Трек-лист' | null
    const [activeSection, setActiveSection] = useState<menuItemType>('Описание программы')
    const menuItems: menuItemType[] = ['Описание программы', 'Трек-лист']

    const toggleMenu = (item: menuItemType) => {
        if (item === activeSection) {
            return setActiveSection(null)
        }
        setActiveSection(item)
    }

    if(loading) return <LoadingSpinner/>
    if(!program) return <NotFoundPage/>
    if(error) return <>{error}</>

    const renderContent = () => {
        switch (activeSection) {
            case 'Описание программы':
                return <Information information={program.information} descriptionFull={program.descriptionFull}/>
            case 'Трек-лист':
                return <TrackList trackList={program.trackList ? program.trackList : []}/>

            default:
                return null
        }
    };

    return (
        <>
            <SEO
                title={`${program.title} | Бэкстейдж, афиша, концерт, билеты`}
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <div className='relative flex flex-col gap-24 w-[90vw] xl:w-[1152px] pt-[88px]'>

                {md ? <HeroDesktop item={program}/> : <HeroMobile item={program} />}

                {program.title === "Симфония Раммштайн" &&
                    <Disclaimer
                        firstArticle=
                            {<>
                                <p className='text-light-brown'>Организатор и исполнители не поддерживают официальную позицию немецкой метал-группы «Rammstein».</p>
                                Организатор и исполнители не несут ответственность за смысл текстов песен, а так же любые высказывания и мнения метал-группы «Rammstein».
                                «Backstage group» не несёт ответственности за содержание авторских материалов.
                            </>}
                        secondArticle=
                            {<>
                                <p className='text-light-brown'>«Backstage group» несёт исключительно культурно-развлекательный характер</p>
                                и исполняет музыку метал-группы «Rammstein»
                                в симфонической аранжировке.
                                Все персонажи являются вымышленными, и любое совпадение с реально живущими или жившими людьми случайно.
                            </>}
                    />
                }

                {program.title === "Симфония Imagine Dragons" &&
                    <Disclaimer
                        firstArticle=
                            {<>
                                <p>Организатор и исполнители не поддерживают официальную позицию группы «Imagine Dragons».</p>
                                Организатор и исполнители не несут ответственность за смысл текстов песен, а так же любые высказывания и мнения группы «Imagine Dragons».
                                «Backstage group» не несёт ответственности за содержание авторских материалов.
                            </>}
                        secondArticle=
                            {<>
                                <p>«Backstage group» несёт исключительно культурно-развлекательный характер</p>
                                и исполняет музыку группы «Imagine Dragons»
                                в симфонической аранжировке.
                                Все персонажи являются вымышленными, и любое совпадение с реально живущими или жившими людьми случайно.
                            </>}
                    />
                }

                <Suspense fallback={<LoadingSpinner/>}>
                    <div className='flex flex-col gap-11'>
                        <h2><Text variant={TextVariant.H2}>ПОДРОБНЕЕ О КОНЦЕРТЕ</Text></h2>
                        <div
                            className={`sticky flex md:w-full w-[90vw] overflow-x-auto scrollbar-hide bg-bg-global z-10
                            ${headerIsVisible ? 'top-[76px]' : 'top-0'} transition-all duration-300`}
                        >
                            {menuItems.map((item) => (
                                <Tab
                                    key={item}
                                    size={xl ? TabButtonSize.medium : TabButtonSize.small}
                                    className='md:flex-1 text-nowrap p-2.5'
                                    isActive={item === activeSection}
                                    onClick={() => toggleMenu(item)}
                                >
                                    {item}
                                </Tab>
                            ))}
                        </div>
                        {renderContent()}
                    </div>
                </Suspense>

                <Suspense fallback={<LoadingSpinner/>}>
                    {(program.photos.length > 0 || program.videos.length > 0) &&
                        <GallerySection
                            photos={program.photos}
                            videos={program.videos}
                        />
                    }
                </Suspense>

                <section className='flex flex-col gap-[100px] xl:gap-40' id='reviews'>
                    <Suspense fallback={<LoadingSpinner />}>
                        <ReviewsSection />
                    </Suspense>
                </section>

                <Suspense fallback={<LoadingSpinner />}>
                    {selectedCity === 'Все города'
                        ? <ProgramEvents events={events}/>
                        : <ProgramEvents events={events.filter((item) => item.city === selectedCity)}/>
                    }
                </Suspense>
            </div>
            </>
    );
};

export default ProgramPage;