import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  EMPTY_DATA, EMPTY_STRING, LIMIT_PER_PAGE, selectorData,
} from '../../../constants/common';
import {
  loadRatesAction, rateModalWindowStateAction, selectedRateDataAction,
} from '../../../redux/actions/EntityTypesAction';
import { entityTypesSelector } from '../../../selectors/entityTypesSelector';
import { IRateInfoState } from '../../../types/state';
import { limitPerPage } from '../../../utils/LimitPerPage';
import EntityListContainer from '../../entity-list-container/EntityListContainer';
import './ListOfRates.scss';
import EditRates from './edit-rates/EditRates';

const ListOfRates = () => {
  const dispatch = useDispatch();
  const { rates, isLoading } = useSelector(entityTypesSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [rateElementsOnPage, setRateElementsOnPage] = useState([] as IRateInfoState[]);

  useEffect(() => {
    dispatch(loadRatesAction());
  }, []);

  useEffect(() => {
    setRateElementsOnPage(limitPerPage(rates.data.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [rates.data.data]);

  useEffect(() => {
    setRateElementsOnPage(limitPerPage(rates.data.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [currentPage]);

  const handleTableRowClick = (rate: IRateInfoState, index: number) => {
    dispatch(selectedRateDataAction(rate, index));
    dispatch(rateModalWindowStateAction(true));
  };

  const table = (
    <table className="list-of-rates__table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Ед. измерения</th>
          <th>Стоимость, ₽</th>
          <th>Последнее обновление</th>
        </tr>
      </thead>
      <tbody>
        {rateElementsOnPage.map((rate: IRateInfoState, index: number) => (
          <tr
            key={index}
            onClick={() => handleTableRowClick(rate, index)}
          >
            <td>{rate.rateTypeId ? rate.rateTypeId.name : EMPTY_DATA}</td>
            <td>{rate.rateTypeId ? rate.rateTypeId.unit : EMPTY_DATA}</td>
            <td>{rate.price}</td>
            <td>{moment(rate.updatedAt).format('DD.MM.YYYY')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <EntityListContainer
        title="Список тарифов"
        childComponent={table}
        dataCount={rates.data.count}
        filterFields={selectorData}
        isLoading={isLoading}
        pageLimit={LIMIT_PER_PAGE}
        setCustomCurrentPage={setCurrentPage}
      />
      {rates.selectedRate.id !== EMPTY_STRING && (
        <EditRates />
      )}
    </>
  );
};

export default ListOfRates;
