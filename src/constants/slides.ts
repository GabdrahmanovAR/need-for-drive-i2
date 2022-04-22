type ISlide = {
  [index: number]: {
    title: string,
    description: string,
  }
};

export const Slides: ISlide = {
  1: {
    title: 'Бесплатная парковка',
    description: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, '
    + 'а также в аэропортах.',
  },
  2: {
    title: 'Страховка',
    description: 'Полная страховка автомобиля.',
  },
  3: {
    title: 'Бензин',
    description: 'Полный бак на любой заправке города за наш счёт.',
  },
  4: {
    title: 'Обслуживание',
    description: 'Автомобиль проходит еженедельное ТО.',
  },
};

export const LEFT_ARROW = 'left';
export const RIGHT_ARROW = 'right';
