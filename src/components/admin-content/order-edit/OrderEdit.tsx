import React from 'react';
import { Button, Form, Select } from 'antd';
import './OrderEdit.scss';

const { Option } = Select;

interface IFormResult {
  username: string;
  password: string;
}

const OrderEdit = () => {
  const onFinish = (values: IFormResult) => {
    console.log(values);
  };

  return (
    <div className="order-edit">
      <Form
        className="order-edit__form"
        name="order-edit"
        onFinish={onFinish}
        layout="inline"
      >
        <div className="order-edit__form__selectors">
          <Form.Item
            name="rate"
            label=""
            initialValue="rate-1"
          >
            <Select style={{ width: 100, fontSize: 11 }}>
              <Option value="rate-1">За неделю</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="car"
            label=""
            initialValue="car-1"
          >
            <Select style={{ width: 100, fontSize: 11 }}>
              <Option value="car-1">Elantra</Option>
              <Option value="car-2">Mazda</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="city"
            label=""
            initialValue="city-1"
          >
            <Select style={{ width: 100, fontSize: 11 }}>
              <Option value="city-1">Ульяновск</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label=""
            initialValue="status-1"
          >
            <Select style={{ width: 100, fontSize: 11 }}>
              <Option value="status-1">В процессе</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="order-edit__form__button">
          <Form.Item name="form-button" style={{ width: 110 }}>
            <Button
              type="primary"
              style={{ width: 110 }}
              htmlType="submit"
              className="form-login__button"
              icon={<span style={{ fontSize: 11 }}>Применить</span>}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default OrderEdit;
