/* eslint-disable jsx-a11y/control-has-associated-label */
import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderFilters from '../order-filters/OrderFilters';
import './ListOfCars.scss';
import { getCarsAction } from '../../../redux/actions/CarsDataAction';
import { carsDataSelector } from '../../../selectors/carsDataSelector';
import { ICarInfoData } from '../../../types/api';
import Spinner from '../../Spinner/Spinner';
import { formatString } from '../../../utils/FormatString';
import { adminCarCardChangeStateAction } from '../../../redux/actions/AdminCarCardAction';
import { adminSidebarChangeMenuAction } from '../../../redux/actions/AdminSidebarMenuAction';

const selectorData = [{
  name: 'field1',
  placeholder: 'Field',
  data: ['Field'],
},
{
  name: 'field2',
  placeholder: 'Field',
  data: ['Field'],
},
{
  name: 'field3',
  placeholder: 'Field',
  data: ['Field'],
},
{
  name: 'field4',
  placeholder: 'Field',
  data: ['Field'],
},
];

const EntityList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const carsDataState = useSelector(carsDataSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarsAction((currentPage - 1).toString(), '5'));
  }, [currentPage]);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTableRowClick = (car: ICarInfoData) => {
    dispatch(adminCarCardChangeStateAction('edit', car));
    dispatch(adminSidebarChangeMenuAction('car'));
  };

  return (
    <main className="entity-list">
      <h2>Список автомобилей</h2>
      <section className="entity-list__info">
        <div className="entity-list__info__edit">
          <OrderFilters selectorData={selectorData} />
        </div>
        <div className="entity-list__info__table">
          {carsDataState.isLoading
            ? <Spinner />
            : (
              <table>
                <thead>
                  <tr>
                    <th>Вид</th>
                    <th>Название</th>
                    <th>Категория</th>
                    <th>Гос. номер</th>
                    <th>Топливо, %</th>
                    <th>Цвета</th>
                    <th>Цена, ₽</th>
                    <th>Об автомобиле</th>
                  </tr>
                </thead>
                <tbody>
                  {carsDataState.dataAdminPart.map((car: ICarInfoData, index: number) => (
                    <tr
                      key={index}
                      onClick={() => handleTableRowClick(car)}
                    >
                      <td><img src={car.thumbnail.path} alt="Car" /></td>
                      <td>{car.name}</td>
                      <td>{car.categoryId.name}</td>
                      <td>{car.number}</td>
                      <td>{car.tank}</td>
                      <td>
                        {car.colors.map((color) => `${formatString(color)} \n`)}
                      </td>
                      <td>{`${car.priceMin} - ${car.priceMax}`}</td>
                      <td>{car.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
        <div className="entity-list__pagination">
          <Pagination
            current={currentPage}
            size="small"
            total={carsDataState.count}
            showSizeChanger={false}
            pageSize={5}
            onChange={handlePaginationChange}
          />
        </div>
      </section>
    </main>
  );
};

export default EntityList;
