import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import './Category.scss';
import { entityTypesSelector } from '../../../selectors/entityTypesSelector';
import { loadCategoryAction } from '../../../redux/actions/EntityTypesAction';
import { ICategory } from '../../../types/api';
import EntityListContainer from '../../entity-list-container/EntityListContainer';

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
  const { category, isLoading } = useSelector(entityTypesSelector);

  useEffect(() => {
    dispatch(loadCategoryAction());
  }, []);

  const table = (
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
  );

  return (
    <>
      <EntityListContainer
        childComponent={table}
        dataCount={category.count}
        filterFields={selectorData}
        isLoading={isLoading}
        pageLimit={pageLimit}
      />
    </>
  );
};

export default Category;
