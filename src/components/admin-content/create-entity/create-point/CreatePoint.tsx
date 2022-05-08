import {
  Form, Input, Button, Select,
} from 'antd';
import React, {
  BaseSyntheticEvent, Dispatch, FC, SetStateAction, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING } from '../../../../constants/common';
import { inputRules } from '../../../../constants/inputRules';
import { createPointAction } from '../../../../redux/actions/PointsDataAction';
import { pointsDataSelector } from '../../../../selectors/pointsDataSelector';
import { ICityInfo } from '../../../../types/api';
import '../CreateEntity.scss';

interface ICreatePointForm {
  name: string;
  address: string;
}

interface ICreatePointProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

const CreatePoint: FC<ICreatePointProps> = ({ setActivePanel }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({} as ICreatePointForm);
  const [formKey, setFormKey] = useState('form-start');
  const [selectedCityId, setSelectedCityId] = useState(EMPTY_STRING);
  const { isLoading, cities } = useSelector(pointsDataSelector);

  const handleCreateButtonClick = (values: ICreatePointForm) => {
    if (selectedCityId !== EMPTY_STRING) dispatch(createPointAction(values.name, values.address, selectedCityId));
    setFormKey('form-end');
  };

  const handleCancelClick = () => {
    setActivePanel(EMPTY_STRING);
  };

  const handleCitySelection = (cityId: string) => {
    setSelectedCityId(cityId);
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    switch (event.target.id) {
      case 'name': {
        setData((prevState) => ({ ...prevState, name: event.target.value }));
        break;
      }
      case 'address':
        setData((prevState) => ({ ...prevState, address: event.target.value }));
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
      <span className="create-entity__title">Город</span>
      <div className="create-entity__field">
        <Form.Item
          name="city"
          rules={inputRules.selectCity}
        >
          <Select
            placeholder="Выберите город"
            onChange={handleCitySelection}
          >
            {cities.data.data.map((city: ICityInfo) => (
              <Select.Option value={city.id}>{city.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <span className="create-entity__title">Название пункта выдачи</span>
      <div className="create-entity__field">
        <Form.Item
          name="name"
          rules={inputRules.city}
        >
          <Input
            id="name"
            placeholder="Введите название пункта выдачи"
            value={data.name}
            onInput={handleInputChange}
          />
        </Form.Item>
      </div>
      <span className="create-entity__title">Адрес пункта выдачи</span>
      <div className="create-entity__field">
        <Form.Item
          name="address"
          rules={inputRules.point}
        >
          <Input
            id="address"
            placeholder="Введите адрес пункта выдачи"
            value={data.address}
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

export default CreatePoint;
