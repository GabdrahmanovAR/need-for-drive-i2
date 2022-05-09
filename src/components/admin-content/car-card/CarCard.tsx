import React, {
  BaseSyntheticEvent, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, Input, Upload,
} from 'antd';
import { RcFile } from 'antd/lib/upload';
import { EditOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import noFoto from '../../../assets/images/no-foto.png';
import './CarCard.scss';
import ProgressBar from '../../progress-bar/ProgressBar';
import { CAR_SAVED, EMPTY_ARRAY, EMPTY_STRING } from '../../../constants/common';
import { formatString } from '../../../utils/FormatString';
import Checkbox from '../checkbox/Checkbox';
import { inputRules } from '../../../constants/inputRules';
import { successfullSaveStateAction } from '../../../redux/actions/SuccessfullSaveAction';
import { adminCarCardSelector } from '../../../selectors/adminCarCardSelector';
import { adminCarCardChangeStateAction } from '../../../redux/actions/AdminCarCardAction';
import { ICarInfoData } from '../../../types/api';

const descriptionInitialState = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae quod dolorum sint alias, possimus illum assumenda eligendi cumque?';

const CarCard = () => {
  const [file, setFile] = useState({} as RcFile);
  const { cardState, data } = useSelector(adminCarCardSelector);
  const dispatch = useDispatch();

  const [carModelInput, setCarModelInput] = useState(EMPTY_STRING);
  const [carTypeInput, setCarTypeInput] = useState(EMPTY_STRING);

  const initialState = {
    colors: data.id ? data.colors : [] as string[],
    newColor: EMPTY_STRING,
    progressBarWidth: '0%',
    placeholderImitation: 'Выберите файл...',
    description: data.id ? data.description : descriptionInitialState,
    descriptionTextValue: data.id ? data.description : descriptionInitialState,
  };

  const [propsState, setPropsState] = useState(initialState);
  const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);

  useEffect(() => {
    setPropsState((prevState) => ({ ...prevState, progressBarWidth: '74%' }));
    console.log(file);
  }, []);

  const handleUploadingFile = (uploadedFile: RcFile) => {
    setFile(uploadedFile);
    setPropsState((prevState) => ({ ...prevState, placeholderImitation: EMPTY_STRING }));
  };

  const handleRemoveFile = () => {
    setPropsState((prevState) => ({ ...prevState, placeholderImitation: 'Выберите файл...' }));
  };

  const handleFinishButtonClick = (values: any) => {
    console.log(values);
    dispatch(successfullSaveStateAction(CAR_SAVED, true));
  };

  const handleResetButtonClcick = () => {
    setPropsState((prevState) => ({ ...prevState, colors: EMPTY_ARRAY, newColor: EMPTY_STRING }));
  };

  const handleInputColor = (event: BaseSyntheticEvent) => {
    setPropsState((prevState) => ({ ...prevState, newColor: event.target.value }));
  };

  const handleAddColorButtonClick = () => {
    if (propsState.colors.indexOf(propsState.newColor) === -1 && propsState.newColor !== EMPTY_STRING) {
      setPropsState((prevState) => ({
        ...prevState, colors: [...propsState.colors, formatString(propsState.newColor)], newColor: EMPTY_STRING,
      }));
    } else if (propsState.newColor !== EMPTY_STRING) {
      setPropsState((prevState) => ({ ...prevState, newColor: EMPTY_STRING }));
    }
  };

  const removeColor = (item: string) => {
    setPropsState((prevState) => ({
      ...prevState, colors: [...propsState.colors.filter((color: string) => color !== item)],
    }));
  };

  const handleClickEditDescriptionIcon = () => {
    setIsModalDescriptionVisible(true);
  };

  const handleClickOkDescriptionModal = () => {
    setPropsState((prevState) => ({ ...prevState, description: propsState.descriptionTextValue }));
    setIsModalDescriptionVisible(false);
  };

  const handleClickCancelDescriptionModal = () => {
    setIsModalDescriptionVisible(false);
  };

  const handleDescriptionInput = (event: BaseSyntheticEvent) => {
    setPropsState((prevState) => ({ ...prevState, descriptionTextValue: event.target.value }));
  };

  const handleAddCardButtonClick = () => {
    dispatch(adminCarCardChangeStateAction('edit', {} as ICarInfoData));
  };

  const handleCancelButtonClick = () => {
    dispatch(adminCarCardChangeStateAction('create', {} as ICarInfoData));
    setPropsState(initialState);
  };

  const handleCarModelInput = (event: BaseSyntheticEvent) => {
    setCarModelInput(event.target.value);
  };

  const handleCarTypeInput = (event: BaseSyntheticEvent) => {
    setCarTypeInput(event.target.value);
  };

  if (cardState === 'create') {
    return (
      <div className="admin-car-card">
        <h2>Добавьте новую карточку автомобиля</h2>
        <Button
          type="primary"
          onClick={handleAddCardButtonClick}
        >
          Добавить
        </Button>
      </div>
    );
  }

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
            <img src={data.id ? data.thumbnail.path : noFoto} alt="Car" />
            <h2>{data.id ? data.name : 'Название автомобиля'}</h2>
            <p>{data.id ? data.categoryId.name : 'Тип автомобиля'}</p>
            <div className="admin-car-card__form__description__img__upload">
              <Form.Item name="file" rules={inputRules.carImage}>
                <Upload
                  name="image-file"
                  beforeUpload={handleUploadingFile}
                  accept=".bmp, .jpeg, .jpg, .png"
                  onRemove={handleRemoveFile}
                >
                  <Input
                    name="file"
                    value={propsState.placeholderImitation}
                    suffix={<div className="upload-button">Обзор</div>}
                  />
                </Upload>
              </Form.Item>
            </div>
          </div>
          <div className="admin-car-card__form__description__progress">
            <div>
              <p>Заполнено</p>
              <p>{propsState.progressBarWidth}</p>
            </div>
            <ProgressBar progressBarWidth={propsState.progressBarWidth} />
          </div>
          <div className="admin-car-card__form__description__text">
            <div className="admin-car-card__form__description__text__title">
              <p>Описание</p>
              <EditOutlined onClick={handleClickEditDescriptionIcon} />
            </div>
            <p>{propsState.description}</p>
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
                <Input
                  placeholder="Введите название..."
                  defaultValue={data.id ? data.name : EMPTY_STRING}
                  value={carModelInput}
                  onInput={handleCarModelInput}
                />
              </Form.Item>
            </div>
            <div className="admin-car-card__form__settings__car_type">
              <span>Тип автомобиля</span>
              <Form.Item
                name="car-type"
                rules={inputRules.carType}
              >
                <Input
                  placeholder="Введите тип..."
                  defaultValue={data.id ? data.categoryId.name : EMPTY_STRING}
                  value={carTypeInput}
                  onInput={handleCarTypeInput}
                />
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
                    value={propsState.newColor}
                  />
                </Form.Item>
              </div>
              <div className="settings-colors__block__add">
                <Button
                  type="default"
                  onClick={handleAddColorButtonClick}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="settings-colors__checkbox">
              <Form.Item>
                {propsState.colors.map((color: string, index: number) => (
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
                  <Button
                    type="primary"
                    htmlType="reset"
                    onClick={handleCancelButtonClick}
                  >
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
      <Modal
        title="Описание"
        visible={isModalDescriptionVisible}
        onOk={handleClickOkDescriptionModal}
        onCancel={handleClickCancelDescriptionModal}
        closable
      >
        <textarea
          className="edit-description"
          name="desciption"
          onInput={handleDescriptionInput}
          value={propsState.descriptionTextValue}
        />
      </Modal>
    </div>
  );
};

export default CarCard;
