import {Suspense, useEffect, useState} from "react";
import {DrupalAPI} from "../../api/drupal.ts";
import {useParams} from "react-router";
import {Program} from "../../types/program.ts";
import {Event} from "../../types/event.ts";
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
import Information from "../EventPage/sections/Information.tsx";

const ProgramPage = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [program, setProgram] = useState<Program | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const {selectedCity} = useCity();
    const md = useMediaBreakpoint('md')

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

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);

                const eventsData = await DrupalAPI.getEventsByProgram(id);
                setEvents(eventsData);

                if (!eventsData) {
                    setError(`События не найдены`);
                }
            } catch (err) {
                console.error('Error loading events:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [id]);

    if(loading) return <LoadingSpinner/>
    if(!program) return <NotFoundPage/>
    if(error) return <>{error}</>

    return (
        <>
            <SEO
                title={`${program.title} | Бэкстейдж, афиша, концерт, билеты`}
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <div className='relative flex flex-col gap-[100px] w-[90vw] xl:w-[1166px]'>

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

                <section>
                    <Suspense fallback={<LoadingSpinner/>}>
                        <Information poster={program.poster} description={program.descriptionFull} />
                    </Suspense>
                </section>

                <section className='flex flex-col gap-[100px] xl:gap-40' id='reviews'>
                    <Suspense fallback={<LoadingSpinner />}>
                        <ReviewsSection />
                    </Suspense>
                </section>
                <Suspense fallback={<LoadingSpinner />}>
                    <ProgramEvents events={events.filter((item) => item.city === selectedCity)}/>
                </Suspense>
            </div>
            </>
    );
};

export default ProgramPage;