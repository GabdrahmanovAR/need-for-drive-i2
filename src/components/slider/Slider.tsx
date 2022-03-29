import React, { useState } from 'react';
import Button from '../button/Button';
import leftArrowIcon from '../../assets/icons/left-arrow.svg';
import rightArrowIcon from '../../assets/icons/right-arrow.svg';
import './Slider.scss';
import { LEFT_ARROW, RIGHT_ARROW, Slides } from '../../constants/slides/slides';
import { EMPTY_STRING } from '../../constants/common';

const Slider = () => {
  const [content, setContent] = useState(1);

  const sliderContent = (title: string, description: string) => (
    <div className="slider-content__info">
      <div className="slider-content__info__text-block">
        <h1 className="slider-content__info__title">{title}</h1>
        <p className="slider-content__info__description">{description}</p>
        <Button text="Подробнее" customClass={`slider-content__info__button active-${content}`} />
      </div>
      <div className="slider-content__info__empty" />
    </div>
  );

  const handleArrowClick = (event: any) => {
    switch (event.target.id) {
      case LEFT_ARROW:
        if (content === 1) setContent(4);
        else setContent(content - 1);
        break;
      case RIGHT_ARROW:
        if (content === 4) setContent(1);
        else setContent(content + 1);
        break;
      default: setContent(1);
    }
  };

  const handleDotsClick = (event: any) => {
    if (event.target.id !== EMPTY_STRING) setContent(Number(event.target.id));
  };

  return (
    <section className={`slider slider_bg-img-${content}`}>
      <div className="slider__layer">
        <aside id="left" className="slider__layer__left-arrow" onClick={handleArrowClick} role="presentation">
          <img src={leftArrowIcon} alt="Arrow icon" />
        </aside>
        <main className="slider__layer__block slider-content">
          {sliderContent(Slides[content].title, Slides[content].description)}
          <div className="slider-content__dots" onClick={handleDotsClick} role="presentation">
            <div id="1" className={`${content === 1 && 'slider-content__dots_active'}`} />
            <div id="2" className={`${content === 2 && 'slider-content__dots_active'}`} />
            <div id="3" className={`${content === 3 && 'slider-content__dots_active'}`} />
            <div id="4" className={`${content === 4 && 'slider-content__dots_active'}`} />
          </div>
        </main>
        <aside id="right" className="slider__layer__right-arrow" onClick={handleArrowClick} role="presentation">
          <img src={rightArrowIcon} alt="Arrow icon" />
        </aside>
      </div>
    </section>
  );
};

export default Slider;
