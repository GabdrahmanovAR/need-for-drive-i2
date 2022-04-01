import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import ruRU from 'antd/lib/locale/ru_RU';
import './index.scss';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import App from './App';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
