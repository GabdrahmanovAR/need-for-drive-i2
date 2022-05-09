import { ICategory, ICityInfo, IPoint } from '../types/api';
import { IRateInfoState, IStatusInfoState } from '../types/state';

export const limitPerPage = (response: IPoint[] | ICategory[] | IRateInfoState[] | ICityInfo[] | IStatusInfoState[], page: number, limit: number) => {
  let allData: any[] = [];
  const indexStart = Number(page) * Number(limit);
  const indexLimit = (Number(page) * Number(limit)) + Number(limit);

  if (response.length !== 0) {
    allData = [...response.slice(indexStart, indexLimit)];
  }
  return allData;
};
