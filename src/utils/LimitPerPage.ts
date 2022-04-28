import { ICityInfo } from '../types/api';

export const limitPerPage = (response: ICityInfo[], page: number, limit: number) => {
  const allData: ICityInfo[] = [];
  const paginationStart = Number(page) * Number(limit);
  const paginationLimit = (Number(page) * Number(limit)) + Number(limit);

  if (response.length !== 0) {
    response.forEach((cityInfo) => {
      allData.push(cityInfo);
    });
  }
  return allData.slice(paginationStart, paginationLimit);
};
