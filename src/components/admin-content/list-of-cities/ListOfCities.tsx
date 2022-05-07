import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_DATA, EMPTY_STRING, LIMIT_PER_PAGE } from '../../../constants/common';
import { cityModalVisibleAction, getPointsAction, selectedCityAction } from '../../../redux/actions/PointsDataAction';
import { pointsDataSelector } from '../../../selectors/pointsDataSelector';
import { ICityInfo } from '../../../types/api';
import { limitPerPage } from '../../../utils/LimitPerPage';
import EntityListContainer from '../../entity-list-container/EntityListContainer';
import EditCities from './edit-cities/EditCities';

const selectorData = [
  {
    name: 'field1',
    placeholder: 'Field',
    data: ['Field'],
  },
  {
    name: 'field2',
    placeholder: 'Field',
    data: ['Field'],
  },
];

const ListOfCities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pointElementsOnPage, setPointElementsOnPage] = useState([] as ICityInfo[]);
  const dispatch = useDispatch();
  const pointsDataState = useSelector(pointsDataSelector);

  useEffect(() => {
    dispatch(getPointsAction('cities'));
  }, []);

  useEffect(() => {
    setPointElementsOnPage(limitPerPage(pointsDataState.cities.data.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [pointsDataState, currentPage]);

  const handleTableRowClick = (cityData: ICityInfo, index: number) => {
    dispatch(selectedCityAction(cityData, index));
    dispatch(cityModalVisibleAction(true));
  };

  const table = (
    <table className="pick-up-point">
      <thead>
        <tr>
          <th>Город</th>
          <th>Дата последнего обновления</th>
        </tr>
      </thead>
      <tbody>
        {pointElementsOnPage.map((cityInfo: ICityInfo, index: number) => (
          <tr
            key={index}
            onClick={() => handleTableRowClick(cityInfo, index)}
          >
            <td>{cityInfo ? cityInfo.name : EMPTY_DATA}</td>
            <td>{cityInfo ? moment(cityInfo.updatedAt).format('DD.MM.YYYY') : EMPTY_DATA}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <EntityListContainer
        title="Список городов"
        childComponent={table}
        dataCount={pointsDataState.cities.data.count}
        filterFields={selectorData}
        isLoading={pointsDataState.isLoading}
        pageLimit={LIMIT_PER_PAGE}
        setCustomCurrentPage={setCurrentPage}
      />
      {pointsDataState.cities.selectedCity.id !== EMPTY_STRING && (
        <EditCities />
      )}
    </>
  );
};

export default ListOfCities;
