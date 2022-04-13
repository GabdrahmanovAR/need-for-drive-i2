import React from 'react';
import { Button, Form, Select } from 'antd';
import './OrderFilters.scss';
import dropdownIcon from '../../../assets/icons/filter-dropdown-icon.svg';

const { Option } = Select;

interface IFormResult {
  username: string;
  password: string;
}

const OrderFilters = () => {
  const onFinish = (values: IFormResult) => values;

  return (
    <div className="order-filter">
      <Form
        className="order-filter__form"
        name="order-filter"
        onFinish={onFinish}
        layout="inline"
      >
        <div className="order-filter__form__selectors">
          <Form.Item name="rate">
            <Select
              suffixIcon={<img src={dropdownIcon} alt="" />}
              placeholder="Интервал"
            >
              <Option value="rate-1">За день</Option>
              <Option value="rate-2">За неделю</Option>
              <Option value="rate-3">За месяц</Option>
            </Select>
          </Form.Item>
          <Form.Item name="car">
            <Select
              suffixIcon={<img src={dropdownIcon} alt="" />}
              placeholder="Марка"
            >
              <Option value="car-1">Elantra</Option>
              <Option value="car-2">Mazda</Option>
            </Select>
          </Form.Item>
          <Form.Item name="city">
            <Select
              suffixIcon={<img src={dropdownIcon} alt="" />}
              placeholder="Город"
            >
              <Option value="city-1">Ульяновск</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status">
            <Select
              suffixIcon={<img src={dropdownIcon} alt="" />}
              placeholder="Статус"
            >
              <Option value="status-1">В процессе</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="order-filter__form__button">
          <Form.Item name="form-button">
            <Button
              type="primary"
              htmlType="submit"
              className="form-login__button"
              icon={<span className="order-filter__form__button__name">Применить</span>}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default OrderFilters;
