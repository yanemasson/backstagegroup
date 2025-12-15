import {lazy, Suspense} from "react";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {Route, Routes} from "react-router";

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));

const EventPage = lazy(() => import('../pages/EventPage/EventPage'));
const EventsPage = lazy(() => import('../pages/EventsPage/EventsPage'));

const NewsListPage = lazy(() => import('../pages/NewsListPage/NewsListPage'));
const NewsPage = lazy(() => import('../pages/NewsPage/NewsPage'));

const AgreementPage = lazy(() => import('../pages/AgreementPage/AgreementPage'));
const OfferPage = lazy(() => import('../pages/OfferPage/OfferPage'));
const PrivacyPage = lazy(() => import('../pages/PrivacyPage/PrivacyPage'));
const RefundPage = lazy(() => import('../pages/RefundPage/RefundPage'))

const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));


const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route index element={<MainPage/>}/>

                <Route path={'events'} element={<EventsPage/>} />
                <Route path={'events/:id'} element={<EventPage/>} />

                <Route path={'news'} element={<NewsListPage/>} />
                <Route path={'news/:id'} element={<NewsPage/>} />

                <Route path={'user_agreement'} element={<AgreementPage/>} />
                <Route path={'offer'} element={<OfferPage/>} />
                <Route path={'privacy_policy'} element={<PrivacyPage/>} />
                <Route path={'refund'} element={<RefundPage/>} />

                <Route path={'*'} element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;