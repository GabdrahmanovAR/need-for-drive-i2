import { Dispatch } from 'redux';
import { IRateActionType } from '../../types/actions';
import { LOAD_RATE_SUCCESS } from '../../constants/actions/rate';
import { getRate } from '../../api-request/apiRequest';
import { IRateState } from '../../types/state';

const loadRateData = (rateData: IRateState): IRateActionType => ({
  type: LOAD_RATE_SUCCESS,
  data: rateData.data,
  count: rateData.count,
});

export const getRateAction = () => async (dispatch: Dispatch) => {
  try {
    const response = await getRate();
    dispatch(loadRateData(response.data));
  } catch (error) {
    console.log(error);
  }
};
