import React from 'react';
import { Button, Form, Input } from 'antd';
import { inputRules } from '../../constants/input-rules/inputRules';
import './LoginForm.scss';
import logoIcon from '../../assets/icons/login-icon.svg';

const LoginForm = () => (
  <main className="login-form">
    <section className="login-form__header">
      <img src={logoIcon} alt="logo" />
      <h2>Need for drive</h2>
    </section>
    <section className="login-form__container">
      <Form name="login-form">
        <p className="form-login__input-title">Почта</p>
        <Form.Item
          name="email"
          label=""
          rules={inputRules.email}
        >
          <Input
            placeholder="Введите e-mail"
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

export default LoginForm;
