import {lazy, Suspense} from "react";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {Navigate, Route, Routes} from "react-router";

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const ConcertListPage = lazy(() => import('../pages/EventListPage/EventListPage'));
const EventPage = lazy(() => import('../pages/EventPage/EventPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const RefundPage = lazy(() => import('../pages/RefundPage/RefundPage.tsx'))
// const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'))

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route index element={<MainPage/>}/>
                <Route path={'events'} element={<ConcertListPage/>} />
                <Route path={'events/:id'} element={<EventPage/>} />
                <Route path={'refund'} element={<RefundPage/>}/>
                <Route path={'*'} element={<NotFoundPage />} />
                <Route
                    path="/events/концерт_саунтдреки_любви_красноярск_2025_03_02_1800"
                    element={<Navigate to="/events/концерт_саундтреки_любви_красноярск_2025_03_02_1800" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;