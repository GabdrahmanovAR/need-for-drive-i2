import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import {
  Button, Form, Input, Upload,
} from 'antd';
import { RcFile } from 'antd/lib/upload';
import carImage from '../../../assets/images/car.png';
import './CarCard.scss';
import ProgressBar from '../../progress-bar/ProgressBar';
import { EMPTY_STRING } from '../../../constants/common';
import { formatString } from '../../../utils/FormatString';
import Checkbox from '../checkbox/Checkbox';
import { inputRules } from '../../../constants/inputRules';

const colorsInitialState = ['Красный', 'Белый', 'Черный'];

const CarCard = () => {
  const [file, setFile] = useState({} as RcFile);
  const [colors, setColors] = useState(colorsInitialState);
  const [newColor, setNewColor] = useState(EMPTY_STRING);
  const [progressBarWidth, setProgressBarWidth] = useState('0%');
  const [inputValue, setInputValue] = useState('Выберите файл...');

  useEffect(() => {
    setProgressBarWidth('74%');
    console.log(file);
  }, []);

  useEffect(() => {
    console.log(colors);
  }, [colors.length]);

  const handleUploadingFile = (uploadedFile: RcFile) => {
    setFile(uploadedFile);
    setInputValue(EMPTY_STRING);
  };

  const handleRemoveFile = () => {
    setInputValue('Выберите файл...');
  };

  const handleFinishButtonClick = (values: any) => {
    console.log(values);
  };

  const handleResetButtonClcick = () => {
    setNewColor(EMPTY_STRING);
    setColors(colorsInitialState);
  };

  const handleInputColor = (event: BaseSyntheticEvent) => {
    setNewColor(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (colors.indexOf(newColor) === -1 && newColor !== EMPTY_STRING) {
      setNewColor(EMPTY_STRING);
      setColors([...colors, formatString(newColor)]);
    } else if (newColor !== EMPTY_STRING) setNewColor(EMPTY_STRING);
  };

  const removeColor = (item: string) => {
    setColors([...colors.filter((color: string) => color !== item)]);
  };

  return (
    <div className="admin-car-card">
      <h2>Карточка автомобиля</h2>
      <Form
        className="admin-car-card__form"
        onFinish={handleFinishButtonClick}
        onReset={handleResetButtonClcick}
      >
        <div className="admin-car-card__form__description">
          <div className="admin-car-card__form__description__img">
            <img src={carImage} alt="Car" />
            <h2>Hyndai, i30 N</h2>
            <p>Компакт-кар</p>
            <div className="admin-car-card__form__description__img__upload">
              <Form.Item name="file">
                <Upload
                  name="image-file"
                  beforeUpload={handleUploadingFile}
                  accept=".bmp, .jpeg, .jpg, .png"
                  onRemove={handleRemoveFile}
                >
                  <Input
                    name="file"
                    value={inputValue}
                    suffix={<div className="upload-button">Обзор</div>}
                  />
                </Upload>
              </Form.Item>
            </div>
          </div>
          <div className="admin-car-card__form__description__progress">
            <div>
              <p>Заполнено</p>
              <p>{progressBarWidth}</p>
            </div>
            <ProgressBar progressBarWidth={progressBarWidth} />
          </div>
          <div className="admin-car-card__form__description__text">
            <p>Описание</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Odio eaque, quidem, commodi soluta qui quae quod dolorum sint alias,
              possimus illum assumenda eligendi cumque?
            </p>
          </div>
        </div>
        <div className="admin-car-card__form__settings">
          <h2>Настройка автомобиля</h2>
          <div className="admin-car-card__form__settings__car">
            <div className="admin-car-card__form__settings__car_model">
              <span>Модель автомобиля</span>
              <Form.Item
                name="car-model"
                rules={inputRules.carModel}
              >
                <Input placeholder="Введите название..." />
              </Form.Item>
            </div>
            <div className="admin-car-card__form__settings__car_type">
              <span>Тип автомобиля</span>
              <Form.Item
                name="car-type"
                rules={inputRules.carType}
              >
                <Input placeholder="Введите тип..." />
              </Form.Item>
            </div>
          </div>
          <span>Доступные цвета</span>
          <div className="admin-car-card__form__settings__colors settings-colors">
            <div className="settings-colors__block">
              <div className="settings-colors__block__input">
                <Form.Item name="car-color" rules={inputRules.carColor}>
                  <Input
                    placeholder="Введите цвет..."
                    onInput={handleInputColor}
                    value={newColor}
                  />
                </Form.Item>
              </div>
              <div className="settings-colors__block__add">
                <Button
                  type="default"
                  onClick={handleAddButtonClick}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="settings-colors__checkbox">
              <Form.Item>
                {colors.map((color: string, index: number) => (
                  <Checkbox
                    text={color}
                    key={index}
                    onRemove={removeColor}
                  />
                ))}
              </Form.Item>
            </div>
          </div>
          <div className="admin-car-card__form__settings__footer settings__footer">
            <div className="settings__footer__edit-buttons">
              <div className="settings__footer__edit-buttons__save">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Сохранить
                  </Button>
                </Form.Item>
              </div>
              <div className="settings__footer__edit-buttons__cancel">
                <Form.Item>
                  <Button type="primary" htmlType="reset">
                    Отменить
                  </Button>
                </Form.Item>
              </div>
            </div>
            <div className="settings__footer__delete-button">
              <Form.Item>
                <Button type="primary" htmlType="button" danger>
                  Удалить
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CarCard;
