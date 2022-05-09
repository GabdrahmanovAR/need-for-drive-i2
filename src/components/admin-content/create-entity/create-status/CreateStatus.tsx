import { Form, Input, Button } from 'antd';
import React, {
  BaseSyntheticEvent, Dispatch, FC, SetStateAction, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING } from '../../../../constants/common';
import { inputRules } from '../../../../constants/inputRules';
import { createStatusAction } from '../../../../redux/actions/EntityTypesAction';
import { entityTypesSelector } from '../../../../selectors/entityTypesSelector';
import '../CreateEntity.scss';

interface ICreateStatusForm {
  status: string;
}

interface ICreateStatusProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

const CreateStatus: FC<ICreateStatusProps> = ({ setActivePanel }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({} as ICreateStatusForm);
  const [formKey, setFormKey] = useState('form-start');
  const { isLoading } = useSelector(entityTypesSelector);

  const handleCreateButtonClick = (values: ICreateStatusForm) => {
    dispatch(createStatusAction(values.status));
    setFormKey('form-end');
  };

  const handleCancelClick = () => {
    setActivePanel(EMPTY_STRING);
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    setData({ status: event.target.value });
  };

  return (
    <Form
      name="create-status-form"
      onFinish={handleCreateButtonClick}
      key={formKey}
    >
      <span className="create-entity__title">Статус</span>
      <div className="create-entity__field">
        <Form.Item
          name="status"
          rules={inputRules.city}
        >
          <Input
            id="status"
            placeholder="Введите название статуса"
            value={data.status}
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

export default CreateStatus;
