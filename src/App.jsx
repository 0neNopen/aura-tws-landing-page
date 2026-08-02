import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProgressBar from './components/layout/ProgressBar';
import HeroSection from './sections/HeroSection';
import StorytellingSection from './sections/StorytellingSection';
import FeatureGridSection from './sections/FeatureGridSection';
import SpecsSection from './sections/SpecsSection';
import CallToActionSection from './sections/CallToActionSection';

export default function App() {
  return (
    <>
      <ProgressBar />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <StorytellingSection />
        <FeatureGridSection />
        <SpecsSection />
        <CallToActionSection />
      </main>
      <Footer />
    </>
  );
}
