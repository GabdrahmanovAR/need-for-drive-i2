import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LIMIT_PER_PAGE, selectorData } from '../../../constants/common';
import { loadRatesAction } from '../../../redux/actions/EntityTypesAction';
import { entityTypesSelector } from '../../../selectors/entityTypesSelector';
import { IRateInfoState } from '../../../types/state';
import EntityListContainer from '../../entity-list-container/EntityListContainer';
import './ListOfRates.scss';

const ListOfRates = () => {
  const dispatch = useDispatch();
  const { rates, isLoading } = useSelector(entityTypesSelector);

  useEffect(() => {
    dispatch(loadRatesAction());
  }, []);

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
        {rates.data.map((rate: IRateInfoState, index: number) => (
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
      />
    </>
  );
};

export default ListOfRates;
