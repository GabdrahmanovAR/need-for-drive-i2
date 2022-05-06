import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { entityTypesSelector } from '../../../selectors/entityTypesSelector';
import {
  categoryModalWindowStateAction,
  loadCategoryAction,
  selectedCategoryDataAction,
} from '../../../redux/actions/EntityTypesAction';
import { ICategory } from '../../../types/api';
import EntityListContainer from '../../entity-list-container/EntityListContainer';
import { EMPTY_STRING, LIMIT_PER_PAGE, selectorData } from '../../../constants/common';
import './Category.scss';
import { limitPerPage } from '../../../utils/LimitPerPage';
import EditCategory from './edit-category/EditCategory';

const Category = () => {
  const dispatch = useDispatch();
  const { category, isLoading } = useSelector(entityTypesSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryElementsOnPage, setCategoryElementsOnPage] = useState([] as ICategory[]);

  useEffect(() => {
    dispatch(loadCategoryAction());
  }, []);

  useEffect(() => {
    setCategoryElementsOnPage(limitPerPage(category.data.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [category]);

  useEffect(() => {
    setCategoryElementsOnPage(limitPerPage(category.data.data, currentPage - 1, LIMIT_PER_PAGE));
  }, [currentPage]);

  const handleTableRowClick = (categoryData: ICategory, index: number) => {
    dispatch(selectedCategoryDataAction(categoryData, index));
    dispatch(categoryModalWindowStateAction(true));
  };

  const table = (
    <table className="category">
      <thead>
        <tr>
          <th>Название</th>
          <th>Описание</th>
          <th>Последнее обновление</th>
        </tr>
      </thead>
      <tbody>
        {categoryElementsOnPage.map((categoryInfo: ICategory, index: number) => (
          <tr
            key={index}
            onClick={() => handleTableRowClick(categoryInfo, index)}
          >
            <td>{categoryInfo.name}</td>
            <td>{categoryInfo.description}</td>
            <td>{moment(categoryInfo.updatedAt).format('DD.MM.YYYY')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <EntityListContainer
        title="Категории автомобилей"
        childComponent={table}
        dataCount={category.data.count}
        filterFields={selectorData}
        isLoading={isLoading}
        pageLimit={LIMIT_PER_PAGE}
        setCustomCurrentPage={setCurrentPage}
      />
      {category.selectedCategory.id !== EMPTY_STRING && (
        <EditCategory />
      )}
    </>
  );
};

export default Category;
