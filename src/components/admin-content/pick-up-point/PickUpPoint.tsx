import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_DATA, EMPTY_STRING, LIMIT_PER_PAGE } from '../../../constants/common';
import { getPointsAction, pointModalVisibleAction, selectedPointACtion } from '../../../redux/actions/PointsDataAction';
import { pointsDataSelector } from '../../../selectors/pointsDataSelector';
import { IPoint } from '../../../types/api';
import { limitPerPage } from '../../../utils/LimitPerPage';
import EntityListContainer from '../../entity-list-container/EntityListContainer';
import EditPoint from './edit-point/EditPoint';
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
  const [pointElementsOnPage, setPointElementsOnPage] = useState([] as IPoint[]);
  const dispatch = useDispatch();
  const pointsDataState = useSelector(pointsDataSelector);

  useEffect(() => {
    dispatch(getPointsAction());
  }, []);

  useEffect(() => {
    setPointElementsOnPage(limitPerPage(pointsDataState.points.data.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [pointsDataState]);

  useEffect(() => {
    setPointElementsOnPage(limitPerPage(pointsDataState.points.data.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [currentPage]);

  const handleTableRowClick = (pointData: IPoint, index: number) => {
    dispatch(selectedPointACtion(pointData, index));
    dispatch(pointModalVisibleAction(true));
  };

  const table = (
    <table className="pick-up-point">
      <thead>
        <tr>
          <th>Город</th>
          <th>Пункт выдачи</th>
          <th>Адрес пункта выдачи</th>
        </tr>
      </thead>
      <tbody>
        {pointElementsOnPage.map((pointInfo: IPoint, index: number) => (
          <tr
            key={index}
            onClick={() => handleTableRowClick(pointInfo, index)}
          >
            <td>{pointInfo.cityId ? pointInfo.cityId.name : EMPTY_DATA}</td>
            <td>{pointInfo.name ? pointInfo.name : EMPTY_DATA}</td>
            <td>{pointInfo.address ? pointInfo.address : EMPTY_DATA}</td>
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
        dataCount={pointsDataState.points.data.count}
        filterFields={selectorData}
        isLoading={pointsDataState.isLoading}
        pageLimit={LIMIT_PER_PAGE}
        setCustomCurrentPage={setCurrentPage}
      />
      {pointsDataState.points.selectedPoint.id !== EMPTY_STRING && (
        <EditPoint />
      )}
    </>
  );
};

export default PickUpPoints;
