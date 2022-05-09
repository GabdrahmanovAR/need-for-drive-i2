import {
  Form, Input, Button,
} from 'antd';
import React, {
  BaseSyntheticEvent, Dispatch, FC, SetStateAction, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING } from '../../../../constants/common';
import { inputRules } from '../../../../constants/inputRules';
import { createRateAction } from '../../../../redux/actions/EntityTypesAction';
import { pointsDataSelector } from '../../../../selectors/pointsDataSelector';
import '../CreateEntity.scss';

interface ICreateRateForm {
  name: string;
  unit: string;
  price: number;
}

interface ICreateRateProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

const CreateRate: FC<ICreateRateProps> = ({ setActivePanel }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({} as ICreateRateForm);
  const [formKey, setFormKey] = useState('form-start');
  const { isLoading } = useSelector(pointsDataSelector);

  const handleCreateButtonClick = (values: ICreateRateForm) => {
    dispatch(createRateAction(values.name, values.unit, values.price));
    setFormKey('form-end');
  };

  const handleCancelClick = () => {
    setActivePanel(EMPTY_STRING);
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    switch (event.target.id) {
      case 'name': {
        setData((prevState) => ({ ...prevState, name: event.target.value }));
        break;
      }
      case 'price':
        setData((prevState) => ({ ...prevState, price: event.target.value }));
        break;
      case 'unit':
        setData((prevState) => ({ ...prevState, unit: event.target.value }));
        break;
      default: console.log('ERROR'); break;
    }
  };

  return (
    <Form
      name="create-point-form"
      onFinish={handleCreateButtonClick}
      key={formKey}
    >
      <span className="create-entity__title">Тариф</span>
      <div className="create-entity__field">
        <Form.Item
          name="name"
          rules={inputRules.rate}
        >
          <Input
            id="name"
            placeholder="Введите название тарифа"
            value={data.name}
            onInput={handleInputChange}
          />
        </Form.Item>
      </div>
      <span className="create-entity__title">Стоимость</span>
      <div className="create-entity__field">
        <Form.Item
          name="price"
          rules={inputRules.price}
        >
          <Input
            id="price"
            placeholder="Введите стоимость тарифа"
            value={data.price}
            onInput={handleInputChange}
          />
        </Form.Item>
      </div>
      <span className="create-entity__title">Единица измерения тарифа</span>
      <div className="create-entity__field">
        <Form.Item
          name="unit"
          rules={inputRules.point}
        >
          <Input
            id="unit"
            placeholder="Введите единицу измерения"
            value={data.unit}
            onInput={handleInputChange}
          />
        </Form.Item>
      </div>
      <div className="create-entity__form-buttons">
        <Form.Item>
          <div>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Создать
            </Button>
            <Button
              type="default"
              htmlType="reset"
              onClick={handleCancelClick}
            >
              Отмена
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateRate;
