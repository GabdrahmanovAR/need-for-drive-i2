import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Button, Form, Input } from 'antd';
import { inputRules } from '../../constants/inputRules';
import './LoginForm.scss';
import logoIcon from '../../assets/icons/login-icon.svg';
import { authorizationRequest } from '../../api-request/apiRequest';
import { IAuthToken } from '../../types/api';

interface IFormResult {
  username: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values: IFormResult) => {
    setIsLoading(true);
    authorizationRequest(values.username, values.password)
      .then((response: AxiosResponse<IAuthToken>) => localStorage.setItem('auth-token', response.data.access_token))
      .finally(() => localStorage.getItem('auth-token') && navigate('/admin/panel'));
  };

  return (
    <main className="login-form">
      <section className="login-form__header">
        <img src={logoIcon} alt="logo" />
        <h2><a className="login-form__header__link" href="/need-for-drive-i2">Need for drive</a></h2>
      </section>
      <section className="login-form__container">
        <Form
          name="login-form"
          onFinish={onFinish}
        >
          <p className="form-login__input-title">Логин</p>
          <Form.Item
            name="username"
            rules={inputRules.email}
          >
            <Input placeholder="Введите логин" />
          </Form.Item>
          <p className="form-login__input-title">Пароль</p>
          <Form.Item
            name="password"
            rules={inputRules.password}
          >
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>
          <div className="login-form__footer">
            <a href="">Запросить доступ</a>
            <Form.Item name="form-button">
              <Button
                type="primary"
                htmlType="submit"
                className="form-login__button"
                loading={isLoading}
                icon={<span>Войти</span>}
              />
            </Form.Item>
          </div>
        </Form>
      </section>
    </main>
  );
};

export default LoginForm;
