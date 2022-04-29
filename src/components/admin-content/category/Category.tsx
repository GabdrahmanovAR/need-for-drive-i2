import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import moment from 'moment';
import Spinner from '../../Spinner/Spinner';
import OrderFilters from '../order-filters/OrderFilters';
import './Category.scss';
import { entityTypesSelector } from '../../../selectors/entityTypesSelector';
import { loadCategoryAction } from '../../../redux/actions/EntityTypesAction';
import { ICategory } from '../../../types/api';

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

const Category = () => {
  const pageLimit = 10;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { category, isLoading } = useSelector(entityTypesSelector);

  useEffect(() => {
    dispatch(loadCategoryAction());
  }, []);

  const tableClassName = cn('category__info__table', {
    category__info__table_loading: isLoading,
  });

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="category">
      <h2>Категории автомобилей</h2>
      <section className="category__info">
        <div className="category__info__filters">
          <OrderFilters selectorData={selectorData} />
        </div>
        <div className={tableClassName}>
          {isLoading
            ? <Spinner />
            : (
              <table>
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Описание</th>
                    <th>Последнее обновление</th>
                  </tr>
                </thead>
                <tbody>
                  {category.data.map((categoryInfo: ICategory, index: number) => (
                    <tr
                      key={index}
                      onClick={() => {}}
                    >
                      <td>{categoryInfo.name}</td>
                      <td>{categoryInfo.description}</td>
                      <td>{moment(categoryInfo.updatedAt).format('DD MMMM YYYY')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
        <div className="category__pagination">
          <Pagination
            current={currentPage}
            size="small"
            total={category.count}
            showSizeChanger={false}
            pageSize={pageLimit}
            onChange={handlePaginationChange}
            disabled={category.count <= pageLimit}
          />
        </div>
      </section>
    </main>
  );
};

export default Category;
