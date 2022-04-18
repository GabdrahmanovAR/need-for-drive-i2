import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import sidebarMenuReducer from './reducers/SidebarMenuReducer';
import advancedTabReducer from './reducers/AdvancedTabReducer';
import focusedItemReducer from './reducers/FocusedItemReducer';
import orderConfirmReducer from './reducers/OrderConfirmReducer';
import orderInfoReducer from './reducers/OrderInfoReducer';
import orderStepReducer from './reducers/OrderStepReducer';
import pointsDataReducer from './reducers/PointsDataReducer';
import carsDataReducer from './reducers/CarsDataReducer';
import radioButtonReducer from './reducers/RadioButtonReducer';
import rateReducer from './reducers/RateReducer';
import orderStatusReducer from './reducers/OrderStatusReducer';
import adminSidebarMenuReducer from './reducers/AdminSidebarMenuReducer';

export const store = createStore(
  combineReducers({
    sidebarMenu: sidebarMenuReducer,
    adminSidebarMenu: adminSidebarMenuReducer,
    advancedTab: advancedTabReducer,
    focusedItem: focusedItemReducer,
    orderConfirm: orderConfirmReducer,
    orderInfo: orderInfoReducer,
    orderStep: orderStepReducer,
    pointsData: pointsDataReducer,
    carsData: carsDataReducer,
    radioButton: radioButtonReducer,
    rate: rateReducer,
    orderStatus: orderStatusReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);
