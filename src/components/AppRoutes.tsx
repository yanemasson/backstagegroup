import {lazy, Suspense} from "react";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {Route, Routes} from "react-router";

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const ConcertListPage = lazy(() => import('../pages/ConcertListPage/ConcertListPage'));
const ConcertPage = lazy(() => import('../pages/ConcertPage/ConcertPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
// const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'))

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route index element={<MainPage />} />
                <Route path={'events'} element={<ConcertListPage />} />
                <Route path={'events/:id'} element={<ConcertPage />} />
                <Route path={'*'} element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;