import { Pagination } from 'antd';
import React, { useState } from 'react';
import OrderFilters from '../order-filters/OrderFilters';
import { DEFAULT_PAGE_LIMIT } from '../../../constants/common';
import './EntityList.scss';

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

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="entity-list">
      <h2>Список основных сущностей системы</h2>
      <section className="entity-list__info">
        <div className="entity-list__info__edit">
          <OrderFilters selectorData={selectorData} />
        </div>
        <div className="entity-list__info__table" />
        <div className="order-menu__info__pagination">
          <Pagination
            current={currentPage}
            size="small"
            total={1}
            showSizeChanger={false}
            pageSize={DEFAULT_PAGE_LIMIT}
            onChange={handlePaginationChange}
            disabled
          />
        </div>
      </section>
    </main>
  );
};

export default EntityList;
