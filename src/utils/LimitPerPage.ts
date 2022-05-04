import { ICategory, ICityInfo } from '../types/api';
import { IRateInfoState } from '../types/state';

export const limitPerPage = (response: ICityInfo[] | ICategory[] | IRateInfoState[], page: number, limit: number) => {
  let allData: any[] = [];
  const paginationStart = Number(page) * Number(limit);
  const paginationLimit = (Number(page) * Number(limit)) + Number(limit);

  if (response.length !== 0) {
    allData = [...response.slice(paginationStart, paginationLimit)];
  }
  return allData;
};
