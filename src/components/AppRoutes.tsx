import {lazy, Suspense} from "react";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {Route, Routes} from "react-router";

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const EventPage = lazy(() => import('../pages/EventPage/EventPage'));
const EventsPage = lazy(() => import('../pages/EventsPage/EventsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));
const RefundPage = lazy(() => import('../pages/RefundPage/RefundPage'))
const NewsListPage = lazy(() => import('../pages/NewsListPage/NewsListPage'));
const NewsPage = lazy(() => import('../pages/NewsPage/NewsPage'));
const PostponementPage = lazy(() => import('../pages/PostponementPage/PostponementPage'));
// const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'))

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route index element={<MainPage/>}/>
                <Route path={'events/:id'} element={<EventPage/>} />
                <Route path={'events'} element={<EventsPage/>} />
                <Route path={'news'} element={<NewsListPage/>} />
                <Route path={'news/:id'} element={<NewsPage/>} />
                <Route path={'refund'} element={<RefundPage/>}/>
                <Route path={'*'} element={<NotFoundPage />} />
                <Route path={'events/2406411'} element={<PostponementPage/>}/>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;