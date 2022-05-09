import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_DATA, LIMIT_PER_PAGE } from '../../../constants/common';
import {
  loadStatusListAction, selectedStatusDataAction, statusModalWindowStateAction,
} from '../../../redux/actions/EntityTypesAction';
import { entityTypesSelector } from '../../../selectors/entityTypesSelector';
import { IStatusInfoState } from '../../../types/state';
import { limitPerPage } from '../../../utils/LimitPerPage';
import EntityListContainer from '../../entity-list-container/EntityListContainer';
import EditStatus from './edit-status/EditStatus';

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

const StatusList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pointElementsOnPage, setPointElementsOnPage] = useState([] as IStatusInfoState[]);
  const dispatch = useDispatch();
  const entityTypesState = useSelector(entityTypesSelector);

  useEffect(() => {
    dispatch(loadStatusListAction());
  }, []);

  useEffect(() => {
    setPointElementsOnPage(limitPerPage(entityTypesState.statusList.data.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [entityTypesState.statusList, currentPage]);

  const handleTableRowClick = (statusInfo: IStatusInfoState, index: number) => {
    dispatch(selectedStatusDataAction(statusInfo, index));
    dispatch(statusModalWindowStateAction(true));
  };

  const table = (
    <table className="status-list">
      <thead>
        <tr>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {pointElementsOnPage.map((statusInfo: IStatusInfoState, index: number) => (
          <tr
            key={index}
            onClick={() => handleTableRowClick(statusInfo, index)}
          >
            <td>{statusInfo ? statusInfo.name : EMPTY_DATA}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <EntityListContainer
        title="Список статусов"
        childComponent={table}
        dataCount={entityTypesState.statusList.data.count}
        filterFields={selectorData}
        isLoading={entityTypesState.isLoading}
        pageLimit={LIMIT_PER_PAGE}
        setCustomCurrentPage={setCurrentPage}
      />
      {entityTypesState.statusList.selectedStatus.id && (
        <EditStatus />
      )}
    </>
  );
};

export default StatusList;
