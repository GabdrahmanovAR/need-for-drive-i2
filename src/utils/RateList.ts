import { IRateInfoState } from '../types/state';

export const RateList = (rates: IRateInfoState[]) => {
  const rateList: string[] = [];

  rates.forEach((rate: IRateInfoState) => {
    if (rate.rateTypeId !== undefined) {
      rateList.push(`${rate.rateTypeId.name}, ${rate.price} ₽/${rate.rateTypeId.unit}`);
    }
  });

  return rateList;
};
