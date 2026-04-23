import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Stats from './components/Stats';
import Catalog from './components/Catalog';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Advantages from './components/Advantages';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      </AnimatePresence>

      {splashDone && (
        <>
          <Header />
          <main>
            <Hero />
            <Ticker />
            <Stats />
            <Catalog />
            <HowItWorks />
            <About />
            <Advantages />
            <Contact />
          </main>
          <Footer />
          <FloatingCTA />
        </>
      )}
    </>
  );
}
