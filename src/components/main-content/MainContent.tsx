import React from 'react';
import './MainContent.scss';
import Button from '../button/Button';
import Header from '../header/Header';

const MainContent = () => (
  <section className="main-content">
    <Header />
    <main className="main-content__info">
      <div className="main-content__info__text-block">
        <h1>Каршеринг</h1>
        <h1>Need for drive</h1>
        <p>Поминутная аренда авто твоего города</p>
        <Button text="Забронировать" customClass="main-content__info__button" link="/order/location" />
      </div>
      <div className="main-content__info__empty" />
    </main>
    <footer className="main-content__footer">
      <p>© 2016-2019 «Need for drive»</p>
      <p>8 (495) 234-22-44</p>
    </footer>
  </section>
);

export default MainContent;
