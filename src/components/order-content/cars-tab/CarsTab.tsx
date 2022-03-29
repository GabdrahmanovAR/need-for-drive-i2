import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RadioButton from '../../radio-button/RadioButton';
import CarCard from '../car-card/CarCard';
import './CarsTab.scss';
import { orderInfoSelector } from '../../../selectors/orderInfoSelector';
import { orderStepSelector } from '../../../selectors/orderStepSelector';
import { carsDataSelector } from '../../../selectors/carsDataSelector';
import { getCarsAction } from '../../../redux/actions/CarsDataAction';
import { ICarInfoData } from '../../../types/api';
import Spinner from '../../Spinner/Spinner';
import { radioButtonSelector } from '../../../selectors/radioButtonSelector';
import { LIMIT_PER_PAGE } from '../../../constants/common';
import { ScrollToTop } from '../../../utils/ScrollToTop';

const CarsTab = () => {
  const orderInfoState = useSelector(orderInfoSelector);
  const orderStepState = useSelector(orderStepSelector);
  const carsDataState = useSelector(carsDataSelector);
  const radioButtonState = useSelector(radioButtonSelector);
  const path = useNavigate();
  const dispatch = useDispatch();

  const regexPremium = new RegExp(/(люкс|спорт|бизнес)/);
  const regexEconomy = new RegExp(/эконом/);

  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    ScrollToTop();
    if (carsDataState.data.length === 0) {
      dispatch(getCarsAction('0', LIMIT_PER_PAGE));
    }
  }, []);

  useEffect(() => {
    if (fetching && carsDataState.data.length < carsDataState.count) {
      dispatch(getCarsAction(page.toString(), LIMIT_PER_PAGE));
      setPage((prevState) => prevState + 1);
      setFetching(false);
    }
  }, [fetching]);

  const handleCarsScroll = (event: any) => {
    if (event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight) {
      setFetching(true);
    }
  };

  const displayCards = () => {
    switch (radioButtonState.selectedItem) {
      case 'all': return carsDataState.data.map((carInfo: ICarInfoData, index: number) => (
        <CarCard
          carInfo={carInfo}
          activeCard={orderInfoState.car.selectedCar}
          id={`model-card-${index}`}
          key={`model-card-${index}`}
        />
      ));
      case 'economy': return carsDataState.data.map((carInfo: ICarInfoData, index: number) => (
        regexEconomy.exec(carInfo.categoryId.name.toLowerCase())
        && (
        <CarCard
          carInfo={carInfo}
          activeCard={orderInfoState.car.selectedCar}
          id={`model-card-${index}`}
          key={`model-card-${index}`}
        />
        )
      ));
      case 'premium': return carsDataState.data.map((carInfo: ICarInfoData, index: number) => (
        regexPremium.exec(carInfo.categoryId.name.toLocaleLowerCase())
        && (
          <CarCard
            carInfo={carInfo}
            activeCard={orderInfoState.car.selectedCar}
            id={`model-card-${index}`}
            key={`model-card-${index}`}
          />
        )
      ));
      default: return <div />;
    }
  };

  return (
    <div className="cars-tab">
      <header className="cars-tab__header">
        <RadioButton
          formName="cars"
          btnNames={['Все модели', 'Эконом', 'Премиум']}
        />
      </header>
      <main className="cars-tab__car-list" onScroll={handleCarsScroll}>
        {displayCards()}
        <div className={`cars-tab__spinner ${carsDataState.isLoading && 'cars-tab__spinner_visible'}`}>
          <Spinner />
        </div>
      </main>
      {!orderStepState.locationTabCompleted && path('/order/location')}
    </div>
  );
};

export default CarsTab;
