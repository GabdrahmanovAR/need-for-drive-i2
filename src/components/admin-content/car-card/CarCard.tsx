import React, {
  BaseSyntheticEvent, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, Input, Select, Upload,
} from 'antd';
import { RcFile } from 'antd/lib/upload';
import { EditOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import _ from 'lodash';
import noFoto from '../../../assets/images/no-foto.png';
import './CarCard.scss';
import ProgressBar from '../../progress-bar/ProgressBar';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../../constants/common';
import { formatString } from '../../../utils/FormatString';
import Checkbox from '../checkbox/Checkbox';
import { inputRules } from '../../../constants/inputRules';
import { adminCarCardSelector } from '../../../selectors/adminCarCardSelector';
import { adminCarCardChangeStateAction } from '../../../redux/actions/AdminCarCardAction';
import { ICarInfoData, ICategory, ICreateCar } from '../../../types/api';
import { entityTypesSelector } from '../../../selectors/entityTypesSelector';
import { toBase64Url } from '../../../utils/ToBase64';
import { createCarAction, deleteCarAction, updateCarAction } from '../../../redux/actions/CarsDataAction';

const descriptionInitialState = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae quod dolorum sint alias, possimus illum assumenda eligendi cumque?';

interface ICarFormValues {
  file: RcFile,
  name: string,
  category: string,
  color: string,
  minPrice: number,
  maxPrice: number,
  tank: number,
  number: string,
}

const CarCard = () => {
  const [file, setFile] = useState({} as RcFile);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [imageBase64Url, setImageBase64Url] = useState(EMPTY_STRING);
  const { cardState, data } = useSelector(adminCarCardSelector);
  const { category } = useSelector(entityTypesSelector);
  const dispatch = useDispatch();

  const [carModelInput, setCarModelInput] = useState(data.id ? data.name : EMPTY_STRING);
  const [numberInput, setNumberInput] = useState(data.id ? data.number : EMPTY_STRING);
  const [tankInput, setTankInput] = useState(data.id ? data.tank : EMPTY_STRING);
  const [selectedCategoryId, setSelectedCategoryId] = useState(data.id ? data.categoryId.id : EMPTY_STRING);

  const initialState = {
    colors: data.id ? data.colors : [] as string[],
    newColor: EMPTY_STRING,
    placeholderImitation: 'Выберите файл...',
    description: data.id ? data.description : descriptionInitialState,
    descriptionTextValue: data.id ? data.description : descriptionInitialState,
    priceMin: data.id ? data.priceMin : 0,
    priceMax: data.id ? data.priceMax : 1000,
  };

  const [propsState, setPropsState] = useState(initialState);
  const [isModalDescriptionVisible, setIsModalDescriptionVisible] = useState(false);

  useEffect(() => {
    setProgressBarWidth(
      +(propsState.colors.length && 12)
      + +(propsState.descriptionTextValue && 4)
      + +(carModelInput && 12)
      + +(numberInput && 12)
      + +(tankInput && 12)
      + +(selectedCategoryId && 12)
      + +(propsState.priceMax && 12)
      + +(propsState.priceMin && 12)
      + +(file && 12),
    );
  }, [
    propsState.colors,
    propsState.descriptionTextValue,
    propsState.priceMax,
    propsState.priceMin,
    carModelInput,
    numberInput,
    tankInput,
    selectedCategoryId,
  ]);

  useEffect(() => {
    if (Object.keys(file).length !== 0) toBase64Url(file, (result) => setImageBase64Url(result));
  }, [file]);

  const handleUploadingFile = (uploadedFile: RcFile) => {
    setFile(uploadedFile);
    setPropsState((prevState) => ({ ...prevState, placeholderImitation: EMPTY_STRING }));
  };

  const handleRemoveFile = () => {
    setPropsState((prevState) => ({ ...prevState, placeholderImitation: 'Выберите файл...' }));
  };

  const handleFinishButtonClick = (values: ICarFormValues) => {
    if (data.id) {
      const updateData: ICreateCar = {
        name: values.name,
        categoryId: selectedCategoryId === EMPTY_STRING ? undefined : { id: selectedCategoryId },
        description: propsState.description === initialState.description ? undefined : propsState.description,
        number: values.number,
        priceMax: values.maxPrice,
        priceMin: values.minPrice,
        tank: values.tank,
        colors: _.isEqual(data.colors, propsState.colors) ? undefined : propsState.colors,
        thumbnail: file.name ? {
          path: imageBase64Url,
          originalname: file.name,
          size: file.size,
          mimetype: file.type,
        } : undefined,
      };
      dispatch(updateCarAction(data.id, updateData));
    } else {
      const newData: ICreateCar = {
        name: values.name,
        categoryId: { id: selectedCategoryId },
        description: propsState.description === initialState.description ? EMPTY_STRING : propsState.description,
        number: values.number,
        priceMax: values.maxPrice,
        priceMin: values.minPrice,
        tank: values.tank,
        colors: propsState.colors,
        thumbnail: {
          path: imageBase64Url,
          originalname: file.name,
          size: file.size,
          mimetype: file.type,
        },
      };
      dispatch(createCarAction(newData));
    }
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

  const handleCategorySelection = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const handleNumberInput = (event: BaseSyntheticEvent) => {
    setNumberInput(event.target.value);
  };

  const handleTankInput = (event: BaseSyntheticEvent) => {
    setTankInput(event.target.value);
  };

  const handleDeleteClick = () => {
    dispatch(deleteCarAction(data.id));
  };

  const handlePriceMaxInput = (event: BaseSyntheticEvent) => {
    setPropsState((prevState) => ({ ...prevState, priceMax: event.target.value }));
  };

  const handlePriceMinInput = (event: BaseSyntheticEvent) => {
    setPropsState((prevState) => ({ ...prevState, priceMin: event.target.value }));
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
            {data.id ? (
              <img src={data.id ? data.thumbnail.path : noFoto} alt="Car" />
            )
              : (
                <img src={imageBase64Url !== EMPTY_STRING ? imageBase64Url : noFoto} alt="Car" />
              )}
            <h2>
              {data.id ? data.name : 'Название автомобиля'}
            </h2>
            <p>{data.id ? data.categoryId.name : 'Тип автомобиля'}</p>
            <div className="admin-car-card__form__description__img__upload">
              <Form.Item
                name="file"
                rules={data.id ? [{}] : inputRules.carImage}
              >
                <Upload
                  name="file"
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
              <p>{`${progressBarWidth}%`}</p>
            </div>
            <ProgressBar progressBarWidth={`${progressBarWidth}%`} />
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
                name="name"
                rules={data.id ? [{}] : inputRules.carModel}
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
              <span>Категория автомобиля</span>
              <Form.Item
                name="category"
                rules={data.id ? [{}] : inputRules.carType}
              >
                <Select
                  placeholder="Выберите категорию"
                  onChange={handleCategorySelection}
                  defaultValue={data.categoryId ? data.categoryId.name : EMPTY_STRING}
                >
                  {category.data.data.map((categoryInfo: ICategory) => (
                    <Select.Option value={categoryInfo.id}>{categoryInfo.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="admin-car-card__form__settings__car">
            <div className="admin-car-card__form__settings__car_model">
              <span>Номер автомобиля</span>
              <Form.Item
                name="number"
                rules={data.id ? [{}] : inputRules.number}
              >
                <Input
                  placeholder="Введите номер автомобиля"
                  defaultValue={data.id ? data.number : EMPTY_STRING}
                  value={numberInput}
                  onInput={handleNumberInput}
                />
              </Form.Item>
            </div>
            <div className="admin-car-card__form__settings__car_type">
              <span>Топливо</span>
              <Form.Item
                name="tank"
                rules={data.id ? [{}] : inputRules.tank}
              >
                <Input
                  placeholder="Введите количество топлива"
                  defaultValue={data.id ? data.tank : EMPTY_STRING}
                  value={tankInput}
                  onInput={handleTankInput}
                />
              </Form.Item>
            </div>
          </div>
          <div className="admin-car-card__form__settings__advanced">
            <div className="admin-car-card__form__settings__advanced__color">
              <span>Доступные цвета</span>
              <div className="admin-car-card__form__settings__colors settings-colors">
                <div className="settings-colors__block">
                  <div className="settings-colors__block__input">
                    <Form.Item
                      name="color"
                      rules={[
                        {
                          required: propsState.colors.length === 0 && true,
                          message: 'Пожалуйста введите не менее 1го цвета',
                        },
                      ]}
                    >
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
            </div>
            <div className="admin-car-card__form__settings__advanced__price">
              <span>Диапозон цен</span>
              <div>
                <div>
                  <Form.Item
                    name="minPrice"
                    rules={data.id ? [{}] : inputRules.price}
                  >
                    <Input
                      placeholder="Введите минимальную стоимость"
                      defaultValue={data.id ? data.priceMin : propsState.priceMin}
                      onInput={handlePriceMinInput}
                      value={propsState.priceMin}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    name="maxPrice"
                    rules={data.id ? [{}] : inputRules.price}
                  >
                    <Input
                      placeholder="Введите максимальную стоимость"
                      defaultValue={data.id ? data.priceMax : propsState.priceMax}
                      onInput={handlePriceMaxInput}
                      value={propsState.priceMax}
                    />
                  </Form.Item>
                </div>
              </div>
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
                <Button
                  type="primary"
                  htmlType="button"
                  danger
                  onClick={handleDeleteClick}
                >
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
