import {lazy, Suspense} from "react";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {Route, Routes} from "react-router";

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));

const ProgramPage = lazy(() => import('../pages/ProgramPage/ProgramPage'));
const EventPage = lazy(() => import('../pages/EventPage/EventPage'));
const EventsPage = lazy(() => import('../pages/EventsPage/EventsPage'));

const NewsListPage = lazy(() => import('../pages/NewsListPage/NewsListPage'));
const NewsPage = lazy(() => import('../pages/NewsPage/NewsPage'));

const AgreementPage = lazy(() => import('../pages/AgreementPage/AgreementPage'));
const OfferPage = lazy(() => import('../pages/OfferPage/OfferPage'));
const RefundPage = lazy(() => import('../pages/RefundPage/RefundPage'))
const PrivacyPage = lazy(() => import('../pages/PrivacyPage/PrivacyPage'));

const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

// SEO-страницы для Красноярска
const MonthPage = lazy(() => import('../pages/MonthPage/MonthPage'));
const CategoryPage = lazy(() => import('../pages/CategoryPage/CategoryPage'));
const SubcategoryPage = lazy(() => import('../pages/CategoryPage/SubcategoryPage'));

// SEO-страницы для Новосибирска
const NovosibirskMainPage = lazy(() => import('../pages/Novosibirsk/NovosibirskMainPage'));
const NovosibirskMonthPage = lazy(() => import('../pages/Novosibirsk/NovosibirskMonthPage'));
const NovosibirskRefundPage = lazy(() => import('../pages/Novosibirsk/NovosibirskRefundPage'));
const NovosibirskCategoryPage = lazy(() => import('../pages/Novosibirsk/NovosibirskCategoryPage'));
const NovosibirskSubcategoryPage = lazy(() => import('../pages/Novosibirsk/NovosibirskSubcategoryPage'));

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december' ];

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route index element={<MainPage/>}/>

                <Route path={'events'} element={<EventsPage/>} />

                <Route path={'programs'} element={<MainPage/>} />
                <Route path={'programs/:id'} element={<ProgramPage/>}/>

                <Route path={'events'} element={<MainPage/>} />
                <Route path={'events/:id'} element={<Suspense fallback={<LoadingSpinner/>}><EventPage/></Suspense>} />

                <Route path={'news'} element={<NewsListPage/>} />
                <Route path={'news/:id'} element={<NewsPage/>} />

                <Route path={'user_agreement'} element={<AgreementPage/>} />
                <Route path={'offer'} element={<OfferPage/>} />
                <Route path={'privacy_policy'} element={<PrivacyPage/>} />
                <Route path={'refund'} element={<RefundPage/>} />

                {/* SEO-страницы: Красноярск */}
                {months.map(item => (
                    <Route key={item} path={item} element={<MonthPage month={item} />} />
                ))}
                <Route path='simfonicheskij-orkestr/:category' element={<CategoryPage />} />
                <Route path='simfonicheskij-orkestr/:category/:subcategory' element={<SubcategoryPage />} />

                {/* SEO-страницы: Новосибирск */}
                <Route path='nsk' element={<NovosibirskMainPage />} />
                {months.map(item => (
                    <Route key={'nsk/' + item} path={'nsk/' + item} element={<NovosibirskMonthPage month={item} />} />
                ))}
                <Route path='nsk/refund' element={<NovosibirskRefundPage />} />
                <Route path='nsk/simfonicheskij-orkestr/:category' element={<NovosibirskCategoryPage />} />
                <Route path='nsk/simfonicheskij-orkestr/:category/:subcategory' element={<NovosibirskSubcategoryPage />} />
                <Route path={'*'} element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;