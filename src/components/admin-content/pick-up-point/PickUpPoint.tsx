import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { getPointsAction } from '../../../redux/actions/PointsDataAction';
import { pointsDataSelector } from '../../../selectors/pointsDataSelector';
import { ICityInfo, IPoint } from '../../../types/api';
import { limitPerPage } from '../../../utils/LimitPerPage';
import Spinner from '../../Spinner/Spinner';
import OrderFilters from '../order-filters/OrderFilters';
import './PickUpPoints.scss';

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
  const pageLimit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsOnPage, setElementsOnPage] = useState([] as ICityInfo[]);
  const dispatch = useDispatch();
  const pointsDataState = useSelector(pointsDataSelector);

  const tableClassName = cn('points__info__table', {
    points__info__table_loading: pointsDataState.isLoading,
  });

  useEffect(() => {
    dispatch(getPointsAction('admin'));
  }, []);

  useEffect(() => {
    setElementsOnPage(limitPerPage(pointsDataState.cities.data, currentPage - 1, pageLimit));
  }, [pointsDataState]);

  useEffect(() => {
    setElementsOnPage(limitPerPage(pointsDataState.cities.data, currentPage - 1, pageLimit));
  }, [currentPage]);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="points">
      <h2>Список пунктов выдачи</h2>
      <section className="points__info">
        <div className="points__info__filters">
          <OrderFilters selectorData={selectorData} />
        </div>
        <div className={tableClassName}>
          {pointsDataState.isLoading
            ? <Spinner />
            : (
              <table>
                <thead>
                  <tr>
                    <th>Город</th>
                    <th>Пункты выдачи</th>
                    <th>Адрес пункта выдачи</th>
                  </tr>
                </thead>
                <tbody>
                  {elementsOnPage.map((cityInfo: ICityInfo, index: number) => (
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
            )}
        </div>
        <div className="points__pagination">
          <Pagination
            current={currentPage}
            size="small"
            total={pointsDataState.cities.count}
            showSizeChanger={false}
            pageSize={pageLimit}
            onChange={handlePaginationChange}
            disabled={pointsDataState.cities.count <= pageLimit}
          />
        </div>
      </section>
    </main>
  );
};

export default PickUpPoints;
