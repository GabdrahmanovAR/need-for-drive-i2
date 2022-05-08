import { Form, Input, Button } from 'antd';
import React, {
  BaseSyntheticEvent, Dispatch, FC, SetStateAction, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING } from '../../../../constants/common';
import { inputRules } from '../../../../constants/inputRules';
import { createCityAction } from '../../../../redux/actions/PointsDataAction';
import { entityTypesSelector } from '../../../../selectors/entityTypesSelector';
import '../CreateEntity.scss';

interface ICreateCityForm {
  city: string;
}

interface ICreateCityProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

const CreateCity: FC<ICreateCityProps> = ({ setActivePanel }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({} as ICreateCityForm);
  const [formKey, setFormKey] = useState('form-start');
  const { isLoading } = useSelector(entityTypesSelector);

  const handleCreateButtonClick = (values: ICreateCityForm) => {
    console.log(values);
    dispatch(createCityAction(values.city));
    setFormKey('form-end');
  };

  const handleCancelClick = () => {
    setActivePanel(EMPTY_STRING);
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    setData({ city: event.target.value });
  };

  return (
    <Form
      name="create-city-form"
      onFinish={handleCreateButtonClick}
      key={formKey}
    >
      <span className="create-entity__title">Город</span>
      <div className="create-entity__field">
        <Form.Item
          name="city"
          rules={inputRules.city}
        >
          <Input
            id="city"
            placeholder="Введите название города"
            value={data.city}
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

export default CreateCity;
