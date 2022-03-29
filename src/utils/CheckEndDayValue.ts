import moment from 'moment';
import { EMPTY_STRING } from '../constants/common';

export const CheckEndDayValue = (dateFrom: string, dateTo: string) => {
  if (moment(dateTo).isAfter(dateFrom)) return dateTo;
  return EMPTY_STRING;
};
