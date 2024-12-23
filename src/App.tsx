import './App.css'
import Header from "./layouts/Header/Header.tsx";
import Hero from "./pages/MainPage/sections/Hero/Hero.tsx";
import ConcertList from "./pages/MainPage/sections/ConcertList/ConcertList.tsx";
import Footer from "./layouts/Footer/Footer.tsx";


function App() {
  return (
      <>
          <Header/>
          <Hero/>
          <ConcertList/>
          <Footer/>
      </>
  )
}

export default App
