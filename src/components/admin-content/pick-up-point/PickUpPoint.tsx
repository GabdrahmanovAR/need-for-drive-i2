import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LIMIT_PER_PAGE } from '../../../constants/common';
import { getPointsAction } from '../../../redux/actions/PointsDataAction';
import { pointsDataSelector } from '../../../selectors/pointsDataSelector';
import { ICityInfo, IPoint } from '../../../types/api';
import { limitPerPage } from '../../../utils/LimitPerPage';
import EntityListContainer from '../../entity-list-container/EntityListContainer';
import './PickUpPoint.scss';

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

const PickUpPoints = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pointElementsOnPage, setPointElementsOnPage] = useState([] as ICityInfo[]);
  const dispatch = useDispatch();
  const pointsDataState = useSelector(pointsDataSelector);

  useEffect(() => {
    if (pointsDataState.cities.data.length === 0) dispatch(getPointsAction('admin'));
  }, []);

  useEffect(() => {
    setPointElementsOnPage(limitPerPage(pointsDataState.cities.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [pointsDataState]);

  useEffect(() => {
    setPointElementsOnPage(limitPerPage(pointsDataState.cities.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [currentPage]);

  const table = (
    <table className="pick-up-point">
      <thead>
        <tr>
          <th>Город</th>
          <th>Пункты выдачи</th>
          <th>Адрес пункта выдачи</th>
        </tr>
      </thead>
      <tbody>
        {pointElementsOnPage.map((cityInfo: ICityInfo, index: number) => (
          <tr
            key={index}
            onClick={() => {}}
          >
            <td>{cityInfo.name}</td>
            <td>
              {pointsDataState.data.map((point: IPoint) => {
                if (point.cityId && point.cityId.id === cityInfo.id) return <div>{point.name}</div>;
                return null;
              })}
            </td>
            <td>
              {pointsDataState.data.map((point: IPoint) => {
                if (point.cityId && point.cityId.id === cityInfo.id) return <div>{point.address}</div>;
                return null;
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <EntityListContainer
        title="Пункты выдачи"
        childComponent={table}
        dataCount={pointsDataState.cities.count}
        filterFields={selectorData}
        isLoading={pointsDataState.isLoading}
        pageLimit={LIMIT_PER_PAGE}
        setCustomCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PickUpPoints;
