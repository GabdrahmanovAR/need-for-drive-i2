import React from 'react';
import { Button, Form, Input } from 'antd';
import { inputRules } from '../../constants/input-rules/inputRules';
import './LoginForm.scss';
import logoIcon from '../../assets/icons/login-icon.svg';
import { authorizationRequest } from '../../api-request/apiRequest';

interface IFormResult {
  username: string;
  password: string;
}

const LoginForm = () => {
  const onFinish = (values: IFormResult) => {
    authorizationRequest(values.username, values.password);
  };

  return (
    <main className="login-form">
      <section className="login-form__header">
        <img src={logoIcon} alt="logo" />
        <h2>Need for drive</h2>
      </section>
      <section className="login-form__container">
        <Form
          name="login-form"
          onFinish={onFinish}
        >
          <p className="form-login__input-title">Логин</p>
          <Form.Item
            name="username"
            label=""
            rules={inputRules.email}
          >
            <Input
              placeholder="Введите логин"
              onChange={(event) => console.log(event.target.value)}
            />
          </Form.Item>
          <p className="form-login__input-title">Пароль</p>
          <Form.Item
            name="password"
            label=""
            rules={inputRules.password}
          >
            <Input.Password
              placeholder="Введите пароль"
              onChange={(event) => console.log(event.target.value)}
            />
          </Form.Item>
          <div className="login-form__footer">
            <a href="">Запросить доступ</a>
            <Form.Item name="form-button">
              <Button
                type="primary"
                htmlType="submit"
                className="form-login__button"
                onClick={() => console.log('Button clicked')}
              >
                Войти
              </Button>
            </Form.Item>
          </div>
        </Form>
      </section>
    </main>
  );
};

export default LoginForm;
