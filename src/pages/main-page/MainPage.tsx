import React from 'react';
import MainContent from '../../components/main-content/MainContent';
import Slider from '../../components/slider/Slider';
import './MainPage.scss';

const MainPage = () => (
  <main className="main-page">
    <MainContent />
    <Slider />
  </main>
);

export default MainPage;
