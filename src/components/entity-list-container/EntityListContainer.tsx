import { Pagination } from 'antd';
import React, {
  Dispatch,
  FC, ReactNode, SetStateAction, useEffect, useState,
} from 'react';
import cn from 'classnames';
import './EntityListContainer.scss';
import Spinner from '../Spinner/Spinner';
import OrderFilters from '../admin-content/order-filters/OrderFilters';

interface IFilterFields {
  name: string,
  placeholder: string,
  data: string[],
}

interface IEntityListContainerProps {
  title: string;
  pageLimit: number;
  isLoading: boolean;
  filterFields: IFilterFields[];
  childComponent: ReactNode;
  dataCount: number;
  setCustomCurrentPage?: Dispatch<SetStateAction<number>>;
}

const EntityListContainer: FC<IEntityListContainerProps> = (props) => {
  const {
    title,
    pageLimit,
    isLoading,
    filterFields,
    childComponent,
    dataCount,
    setCustomCurrentPage,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const tableClassName = cn('entity-container__info__table', {
    'entity-container__info__table_loading': isLoading,
  });

  useEffect(() => {
    if (setCustomCurrentPage) {
      setCustomCurrentPage(currentPage);
    }
  }, [currentPage]);

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="entity-container">
      <h2>{title}</h2>
      <section className="entity-container__info">
        <div className="entity-container__info__filters">
          <OrderFilters selectorData={filterFields} />
        </div>
        <div className={tableClassName}>
          {isLoading
            ? <Spinner />
            : childComponent}
        </div>
        <div className="entity-container__pagination">
          <Pagination
            current={currentPage}
            size="small"
            total={dataCount}
            showSizeChanger={false}
            pageSize={pageLimit}
            onChange={handlePaginationChange}
            disabled={dataCount <= pageLimit}
          />
        </div>
      </section>
    </main>
  );
};

export default EntityListContainer;
