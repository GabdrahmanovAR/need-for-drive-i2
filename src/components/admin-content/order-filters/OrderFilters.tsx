import React, { FC } from 'react';
import { Button, Form, Select } from 'antd';
import './OrderFilters.scss';
import dropdownIcon from '../../../assets/icons/filter-dropdown-icon.svg';

const { Option } = Select;

interface IReceivedDataProps {
  name: string;
  placeholder: string;
  data: Array<string>;
}

interface IOrderFiltersProps {
  selectorData: IReceivedDataProps[];
}

const OrderFilters: FC<IOrderFiltersProps> = ({ selectorData }) => {
  const onFinish = () => {};

  return (
    <div className="order-filter">
      <Form
        className="order-filter__form"
        name="order-filter"
        onFinish={onFinish}
        layout="inline"
      >
        <div className="order-filter__form__selectors">
          {selectorData.map((selectorInfo: IReceivedDataProps, index: number) => (
            <Form.Item
              name={selectorInfo.name}
              key={`form-selector-${index}`}
            >
              <Select
                suffixIcon={<img src={dropdownIcon} alt="" />}
                placeholder={selectorInfo.placeholder}
              >
                {selectorInfo.data.map((selectorValue, selectorIndex) => (
                  <Option
                    value={`${selectorInfo.name}-${selectorIndex}`}
                    key={`selector-${selectorIndex}`}
                  >
                    {selectorValue}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ))}
        </div>
        <div className="order-filter__form__buttons">
          <Form.Item className="reset-button-form" name="reset-button">
            <Button
              type="primary"
              htmlType="reset"
              className="reset-button"
              icon={<span className="order-filter__form__buttons__name">Сбросить</span>}
              danger
            />
          </Form.Item>
          <Form.Item className="apply-button-form" name="button-apply">
            <Button
              type="primary"
              htmlType="submit"
              className="apply-button"
              icon={<span className="order-filter__form__buttons__name">Применить</span>}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default OrderFilters;
