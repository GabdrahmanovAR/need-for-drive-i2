import React from 'react';
import { Button } from 'antd';
import './ErrorPage.scss';

const ErrorPage = () => (
  <div className="admin-error">
    <h1>500</h1>
    <h2>Что-то пошло не так</h2>
    <p>Попробуйте перезагрузить страницу</p>
    <Button type="primary">Назад</Button>
  </div>
);

export default ErrorPage;
