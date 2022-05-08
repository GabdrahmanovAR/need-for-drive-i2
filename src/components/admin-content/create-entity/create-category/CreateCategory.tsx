import { Form, Input, Button } from 'antd';
import React, {
  BaseSyntheticEvent, Dispatch, FC, SetStateAction, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING } from '../../../../constants/common';
import { inputRules } from '../../../../constants/inputRules';
import { createCategoryAction } from '../../../../redux/actions/EntityTypesAction';
import { entityTypesSelector } from '../../../../selectors/entityTypesSelector';
import '../CreateEntity.scss';

interface ICreateCategoryForm {
  category: string;
  description: string;
}

interface ICreateCategoryProps {
  setActivePanel: Dispatch<SetStateAction<string>>;
}

const CreateCategory: FC<ICreateCategoryProps> = ({ setActivePanel }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({} as ICreateCategoryForm);
  const [formKey, setFormKey] = useState('form-start');
  const { isLoading } = useSelector(entityTypesSelector);

  const handleCreateButtonClick = (values: ICreateCategoryForm) => {
    dispatch(createCategoryAction(values.category, values.description));
    setFormKey('form-end');
  };

  const handleCancelClick = () => {
    setActivePanel(EMPTY_STRING);
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    switch (event.target.id) {
      case 'category': {
        setData((prevState) => ({ ...prevState, category: event.target.value }));
        break;
      }
      case 'description':
        setData((prevState) => ({ ...prevState, description: event.target.value }));
        break;

      default: console.log('ERROR'); break;
    }
  };

  return (
    <Form
      name="create-category-form"
      onFinish={handleCreateButtonClick}
      key={formKey}
    >
      <span className="create-entity__title">Категория</span>
      <div className="create-entity__field">
        <Form.Item
          name="category"
          rules={inputRules.category}
        >
          <Input
            id="category"
            placeholder="Введите название категории"
            value={data.category}
            onInput={handleInputChange}
          />
        </Form.Item>
      </div>
      <span className="create-entity__title">Описание</span>
      <div className="create-entity__field">
        <Form.Item
          name="description"
          rules={inputRules.description}
        >
          <Input
            id="description"
            placeholder="Введите описание"
            value={data.description}
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

export default CreateCategory;
