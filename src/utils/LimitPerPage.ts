import { ICategory, IPoint } from '../types/api';
import { IRateInfoState } from '../types/state';

export const limitPerPage = (response: IPoint[] | ICategory[] | IRateInfoState[], page: number, limit: number) => {
  let allData: any[] = [];
  const indexStart = Number(page) * Number(limit);
  const indexLimit = (Number(page) * Number(limit)) + Number(limit);

  if (response.length !== 0) {
    allData = [...response.slice(indexStart, indexLimit)];
  }
  return allData;
};
