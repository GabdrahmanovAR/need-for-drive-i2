import { Pagination } from 'antd';
import React, { useState } from 'react';
import OrderFilters from '../order-filters/OrderFilters';
import { DEFAULT_PAGE_LIMIT } from '../../../constants/common';
import './EntityList.scss';

const data = [1, 2, 3, 4, 5, 6];

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
        <div className="entity-list__info__table">
          <table>
            <thead>
              <tr>
                <th>Header</th>
                <th>Header</th>
                <th>Header</th>
                <th>Header</th>
                <th>Header</th>
                <th>Header</th>
                <th>Header</th>
              </tr>
            </thead>
            <tbody>
              {data.map((index) => (
                <tr key={index}>
                  <td>Value</td>
                  <td>19,291</td>
                  <td>19,291</td>
                  <td>19,291</td>
                  <td>19,291</td>
                  <td>19,291</td>
                  <td />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
