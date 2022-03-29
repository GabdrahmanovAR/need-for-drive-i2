import produce from 'immer';
import { IRateInfoState, IRateState } from '../../types/state';
import { IRateActionType } from '../../types/actions';
import { LOAD_RATE_SUCCESS } from '../../constants/actions/rate';

const initialState: IRateState = {
  count: 0,
  data: [] as IRateInfoState[],
};

const loadRate = (draft: IRateState, data?: IRateInfoState[], count?: number) => {
  draft.data = data || [];
  draft.count = count || 0;
  return draft;
};

export default (state = initialState, action: IRateActionType) => produce(
  state,
  (draft: IRateState) => {
    switch (action.type) {
      case LOAD_RATE_SUCCESS: return loadRate(draft, action.data, action.count);
      default: return state;
    }
  },
);
