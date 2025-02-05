import {lazy, Suspense} from "react";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {Route, Routes, Navigate} from "react-router";

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
                {/*redirect*/}
                <Route
                    path={'events/концерт_симфония_битлз_красноярск_2025_02_16_1800'}
                    element={<Navigate replace to={'/events/концерт_симфония_битлз_красноярск_2025_02_15_1800'}/>}
                />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;