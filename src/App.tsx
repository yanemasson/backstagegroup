import Navbar from "./layouts/Navbar/Navbar.tsx";
import Footer from "./layouts/Footer/Footer.tsx";
import {BrowserRouter} from "react-router";
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop.tsx";
import AppRoutes from "./components/AppRoutes.tsx";
import MetricsProvider from "./components/Metrika/MetricsProvider.tsx";
import {CityProvider} from "./context/CityContext.tsx";

function App() {

    return (
        <HelmetProvider>
            <CityProvider>
                <BrowserRouter>
                    <MetricsProvider>
                        <ScrollToTop />
                        <div className='bg-bg-global text-text-primary flex flex-col justify-center items-center'>
                            <div className="flex flex-col items-center min-h-screen ">
                                <Navbar/>
                                <main className="flex-grow flex flex-col items-center mb-20 w-full gap-24">
                                    <AppRoutes/>
                                    <Footer/>
                                </main>
                            </div>
                        </div>
                    </MetricsProvider>
                </BrowserRouter>
            </CityProvider>
        </HelmetProvider>
  )
}

export default App
