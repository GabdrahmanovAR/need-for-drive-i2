import moment from 'moment';
import { IOrderCarInfoState } from '../types/state';

export const CalculateTotalCost = (carInfo: IOrderCarInfoState) => {
  let totalCost = 0;

  const duration = moment.duration(moment(carInfo.rentalDuration.from).diff(moment(carInfo.rentalDuration.to)));
  const fullTank = carInfo.fullTank ? 500 : 0;
  const childChair = carInfo.babyChair ? 200 : 0;
  const rightWheel = carInfo.rightHandDrive ? 1600 : 0;

  switch (carInfo.tariff) {
    case 'Поминутно': {
      const minutes = Math.abs(duration.asMinutes());
      totalCost = (7 * minutes) + fullTank + childChair + rightWheel;
      return totalCost < Number(carInfo.minPrice) ? Number(carInfo.minPrice) : Math.round(totalCost);
    }
    case 'Суточный': {
      const days = Math.abs(duration.asDays()) < 1 ? 1 : Math.abs(duration.asDays());
      totalCost = (1500 * Math.ceil(days)) + fullTank + childChair + rightWheel;
      return totalCost < Number(carInfo.minPrice) ? Number(carInfo.minPrice) : Math.round(totalCost);
    }
    case 'Недельный (Акция!)': {
      const weeks = Math.abs(duration.asWeeks()) < 1 ? 1 : Math.abs(duration.asWeeks());
      totalCost = (7500 * Math.ceil(weeks)) + fullTank + childChair + rightWheel;
      return totalCost < Number(carInfo.minPrice) ? Number(carInfo.minPrice) : Math.round(totalCost);
    }
    case 'Месячный': {
      const months = Math.abs(duration.asMonths()) < 1 ? 1 : Math.abs(duration.asMonths());
      totalCost = (30000 * Math.ceil(months)) + fullTank + childChair + rightWheel;
      return totalCost < Number(carInfo.minPrice) ? Number(carInfo.minPrice) : Math.round(totalCost);
    }
    default: return Number(carInfo.minPrice);
  }
};
