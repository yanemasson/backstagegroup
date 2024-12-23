import './App.css'
import Header from "./layouts/Header/Header.tsx";
import Footer from "./layouts/Footer/Footer.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import MainPage from "./pages/MainPage/MainPage.tsx";
import ConcertListPage from "./pages/ConcertListPage/ConcertListPage.tsx";
import ConcertPage from "./pages/ConcertPage/ConcertPage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";


function App() {
  return (
      <>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route index element={<MainPage/>}/>
                  <Route path={'events'} element={<ConcertListPage/>}/>
                  <Route path={'events/:id'} element={<ConcertPage/>}/>
                  <Route path={'*'} element={<NotFoundPage/>}/>
              </Routes>
              <Footer/>
          </BrowserRouter>
      </>
  )
}

export default App
