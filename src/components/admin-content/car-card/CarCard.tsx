import React from 'react';
import { Button, Form } from 'antd';
import './CarCard.scss';

const CarCard = () => (
  <div className="admin-car-card">
    <h2>Карточка автомобиля</h2>
    <Form className="admin-car-card__form">
      <div className="admin-car-card__form__description" />
      <div className="admin-car-card__form__settings">
        <div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="reset">
              Отменить
            </Button>
          </Form.Item>
        </div>
        <div>
          <Form.Item>
            <Button type="primary" htmlType="button" danger>
              Удалить
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  </div>
);

export default CarCard;
