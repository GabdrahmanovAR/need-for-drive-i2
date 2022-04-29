import { EMPTY_STRING } from '../constants/common';

export const CarNumber = (carNumber: string) => {
  const regex = /[A-zА-я](?=[0-9])|[0-9](?=[A-zА-я])/g;

  return carNumber ? carNumber.toUpperCase().replace(regex, '$& ') : EMPTY_STRING;
};
