import React from 'react';
import { DatePicker } from 'antd';
import './Calendar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { inputFieldSelector } from '../../selectors/inputFieldSelector';
import { endDayRentAction, startDayRentAction } from '../../redux/actions/OrderInfoAction';
import { orderInfoSelector } from '../../selectors/orderInfoSelector';
import { EMPTY_STRING } from '../../constants/common';
import { CheckEndDayValue } from '../../utils/CheckEndDayValue';

const Calendar = () => {
  const inputFieldState = useSelector(inputFieldSelector);
  const { car } = useSelector(orderInfoSelector);
  const dispatch = useDispatch();

  const onChange = (value: any, dateString: string) => {
    if (inputFieldState.focusedField === 'start-day') dispatch(startDayRentAction(dateString));
    else if (car.rentalDuration.from !== EMPTY_STRING) {
      dispatch(endDayRentAction(CheckEndDayValue(car.rentalDuration.from, dateString)));
    }
  };

  return (
    <div className="calendar">
      <DatePicker showTime onChange={onChange} />
    </div>
  );
};

export default Calendar;
