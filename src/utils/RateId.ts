import { IRateInfoState } from '../types/state';
import { EMPTY_STRING } from '../constants/common';

export const RateId = (rates: IRateInfoState[], clickedValue: string) => {
  let id = EMPTY_STRING;
  rates.forEach((rate) => {
    if (rate.rateTypeId.name === clickedValue.split(',')[0]) id = rate.id;
  });
  return id;
};
