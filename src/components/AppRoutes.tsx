import {lazy, Suspense} from "react";
import LoadingSpinner from "./LoadingSpinner.tsx";
import {Route, Routes} from "react-router";

const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const EventPage = lazy(() => import('../pages/EventPage/EventPage'));
const NewsListPage = lazy(() => import('../pages/NewsListPage/NewsListPage'));
const NewsPage = lazy(() => import('../pages/NewsPage/NewsPage'));

const RefundPage = lazy(() => import('../pages/RefundPage/RefundPage'))
const PrivacyPage = lazy(() => import('../pages/PrivacyPage/PrivacyPage'));
const OfferPage = lazy(() => import('../pages/OfferPage/OfferPage'));
const AgreementPage = lazy(() => import('../pages/AgreementPage/AgreementPage'));

const PostponementPage = lazy(() => import('../pages/PostponementPage/PostponementPage'));
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

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route index element={<MainPage/>}/>

                {/* SEO-страницы: Месяцы для Красноярска */}
                <Route path='yanvar' element={<MonthPage month="yanvar" />} />
                <Route path='fevral' element={<MonthPage month="fevral" />} />
                <Route path='mart' element={<MonthPage month="mart" />} />
                <Route path='aprel' element={<MonthPage month="aprel" />} />
                <Route path='maj' element={<MonthPage month="maj" />} />
                <Route path='iyun' element={<MonthPage month="iyun" />} />
                <Route path='iyul' element={<MonthPage month="iyul" />} />
                <Route path='avgust' element={<MonthPage month="avgust" />} />
                <Route path='sentyabr' element={<MonthPage month="sentyabr" />} />
                <Route path='oktyabr' element={<MonthPage month="oktyabr" />} />
                <Route path='noyabr' element={<MonthPage month="noyabr" />} />
                <Route path='dekabr' element={<MonthPage month="dekabr" />} />

                {/* SEO-страницы: Категории для Красноярска */}
                <Route path='simfonicheskij-orkestr/:category' element={<CategoryPage />} />
                <Route path='simfonicheskij-orkestr/:category/:subcategory' element={<SubcategoryPage />} />

                {/* SEO-страницы: Новосибирск */}
                <Route path='nsk' element={<NovosibirskMainPage />} />
                <Route path='nsk/yanvar' element={<NovosibirskMonthPage month="yanvar" />} />
                <Route path='nsk/fevral' element={<NovosibirskMonthPage month="fevral" />} />
                <Route path='nsk/mart' element={<NovosibirskMonthPage month="mart" />} />
                <Route path='nsk/aprel' element={<NovosibirskMonthPage month="aprel" />} />
                <Route path='nsk/maj' element={<NovosibirskMonthPage month="maj" />} />
                <Route path='nsk/iyun' element={<NovosibirskMonthPage month="iyun" />} />
                <Route path='nsk/iyul' element={<NovosibirskMonthPage month="iyul" />} />
                <Route path='nsk/avgust' element={<NovosibirskMonthPage month="avgust" />} />
                <Route path='nsk/sentyabr' element={<NovosibirskMonthPage month="sentyabr" />} />
                <Route path='nsk/oktyabr' element={<NovosibirskMonthPage month="oktyabr" />} />
                <Route path='nsk/noyabr' element={<NovosibirskMonthPage month="noyabr" />} />
                <Route path='nsk/dekabr' element={<NovosibirskMonthPage month="dekabr" />} />
                <Route path='nsk/refund' element={<NovosibirskRefundPage />} />
                <Route path='nsk/simfonicheskij-orkestr/:category' element={<NovosibirskCategoryPage />} />
                <Route path='nsk/simfonicheskij-orkestr/:category/:subcategory' element={<NovosibirskSubcategoryPage />} />

                {/* Существующие маршруты */}
                <Route path={'events/:id'} element={<EventPage/>} />
                <Route path={'news'} element={<NewsListPage/>} />
                <Route path={'news/:id'} element={<NewsPage/>} />

                <Route path={'user_agreement'} element={<AgreementPage/>} />
                <Route path={'offer'} element={<OfferPage/>} />
                <Route path={'refund'} element={<RefundPage/>} />
                <Route path={'privacy_policy'} element={<PrivacyPage/>} />

                <Route path={'events/2406411'} element={<PostponementPage/>} />
                <Route path={'*'} element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;