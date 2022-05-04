import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LIMIT_PER_PAGE, selectorData } from '../../../constants/common';
import { loadRatesAction } from '../../../redux/actions/EntityTypesAction';
import { entityTypesSelector } from '../../../selectors/entityTypesSelector';
import { IRateInfoState } from '../../../types/state';
import { limitPerPage } from '../../../utils/LimitPerPage';
import EntityListContainer from '../../entity-list-container/EntityListContainer';
import './ListOfRates.scss';

const ListOfRates = () => {
  const dispatch = useDispatch();
  const { rates, isLoading } = useSelector(entityTypesSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [rateElementsOnPage, setRateElementsOnPage] = useState([] as IRateInfoState[]);

  useEffect(() => {
    if (rates.data.length === 0) dispatch(loadRatesAction());
  }, []);

  useEffect(() => {
    setRateElementsOnPage(limitPerPage(rates.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [rates]);

  useEffect(() => {
    setRateElementsOnPage(limitPerPage(rates.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [currentPage]);

  const table = (
    <table className="list-of-rates">
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
            onClick={() => {}}
          >
            <td>{rate.rateTypeId.name}</td>
            <td>{rate.rateTypeId.unit}</td>
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
        dataCount={rates.count}
        filterFields={selectorData}
        isLoading={isLoading}
        pageLimit={LIMIT_PER_PAGE}
        setCustomCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ListOfRates;
