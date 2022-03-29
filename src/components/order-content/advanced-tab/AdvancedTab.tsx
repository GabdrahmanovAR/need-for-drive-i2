import React, { useEffect } from 'react';
import './AdvancedTab.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RadioButton from '../../radio-button/RadioButton';
import InputField from '../../input-field/InputField';
import { EMPTY_STRING } from '../../../constants/common';
import Calendar from '../../calendar/Calendar';
import { ScrollToTop } from '../../../utils/ScrollToTop';
import { orderInfoSelector } from '../../../selectors/orderInfoSelector';
import { orderStepSelector } from '../../../selectors/orderStepSelector';
import { endDayRentAction, startDayRentAction } from '../../../redux/actions/OrderInfoAction';
import { CheckEndDayValue } from '../../../utils/CheckEndDayValue';
import { getRateAction } from '../../../redux/actions/RateAction';
import { RateList } from '../../../utils/RateList';
import { rateSelector } from '../../../selectors/rateSelector';
import { changeAdvTabStateAction } from '../../../redux/actions/OrderStepAction';

const AdvancedTab = () => {
  const { car } = useSelector(orderInfoSelector);
  const orderStepState = useSelector(orderStepSelector);
  const rateState = useSelector(rateSelector);
  const dispatch = useDispatch();
  const path = useNavigate();

  useEffect(() => {
    ScrollToTop();
    dispatch(getRateAction());
  }, []);

  const handleStartDateDeleteClick = () => {
    dispatch(startDayRentAction(EMPTY_STRING));
    dispatch(endDayRentAction(EMPTY_STRING));
    dispatch(changeAdvTabStateAction(false));
  };

  const handleEndDateDeleteClick = () => {
    dispatch(endDayRentAction(EMPTY_STRING));
    dispatch(changeAdvTabStateAction(false));
  };

  return (
    <div className="advanced-tab">
      <header className="advanced-tab__header">
        <p>Цвет</p>
        <RadioButton
          formName="color"
          btnNames={['Любой', ...car.colors]}
        />
      </header>
      <section>
        <p>Дата аренды</p>
        <div className="advanced-tab__input-fields">
          <InputField
            id="start-day"
            fieldValue={car.rentalDuration.from}
            placeholder="Выберите дату и время"
            title="С"
            onClickBtnFunc={handleStartDateDeleteClick}
            childComponent={<Calendar />}
          />
          <InputField
            id="end-day"
            fieldValue={CheckEndDayValue(car.rentalDuration.from, car.rentalDuration.to)}
            placeholder="Выберите дату и время"
            title="По"
            onClickBtnFunc={handleEndDateDeleteClick}
            childComponent={<Calendar />}
          />
        </div>
      </section>
      <section>
        <p>Тариф</p>
        <RadioButton
          formName="tariff"
          btnNames={RateList(rateState.data)}
          direction="column"
        />
      </section>
      <section>
        <p>Доп. услуги</p>
        <RadioButton
          formName="advanced"
          btnNames={['Полный бак, 500₽', 'Детское кресло, 200₽', 'Правый руль, 1600₽']}
          type="checkbox"
          direction="column"
        />
      </section>
      {!orderStepState.locationTabCompleted && path('/order/location')}
    </div>
  );
};

export default AdvancedTab;
