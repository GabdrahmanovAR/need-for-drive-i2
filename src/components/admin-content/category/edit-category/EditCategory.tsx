import {
  Modal, Form, Input, Button,
} from 'antd';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING } from '../../../../constants/common';
import { inputRules } from '../../../../constants/inputRules';
import {
  categoryModalWindowStateAction,
  changeCategoryAction,
  deleteCategoryAction,
  selectedCategoryDataCLearAction,
} from '../../../../redux/actions/EntityTypesAction';
import { entityTypesSelector } from '../../../../selectors/entityTypesSelector';
import './EditCategory.scss';

interface ICategoryFormResult {
  category: string;
  description: string;
}

const EditCategory = () => {
  const dispatch = useDispatch();
  const { category } = useSelector(entityTypesSelector);
  const [data, setData] = useState({
    category: EMPTY_STRING,
    description: EMPTY_STRING,
  } as ICategoryFormResult);

  useEffect(() => {
    if (category.selectedCategory.id !== EMPTY_STRING) {
      setData({
        category: category.selectedCategory.name,
        description: category.selectedCategory.description,
      });
    }
  }, [category.selectedCategory]);

  const handleCancelClick = () => {
    dispatch(selectedCategoryDataCLearAction());
    setData({
      category: EMPTY_STRING,
      description: EMPTY_STRING,
    });
  };

  const handleDeleteClick = () => {
    dispatch(deleteCategoryAction(category.selectedCategory.id));
    dispatch(selectedCategoryDataCLearAction());
    setData({
      category: EMPTY_STRING,
      description: EMPTY_STRING,
    });
  };

  const handleSaveChangesButtonClick = (values: ICategoryFormResult) => {
    if (category.selectedCategory.name !== values.category
      || category.selectedCategory.description !== values.description) {
      dispatch(changeCategoryAction(category.selectedCategory.id, values.category, values.description));
    }
    dispatch(categoryModalWindowStateAction(false));
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
    <Modal
      className="list-of-categories__modal"
      title="Изменение тарифа"
      visible={category.categoryModalVisible}
      closable
      onCancel={handleCancelClick}
      footer={null}
    >
      <Form
        name="category-form"
        onFinish={handleSaveChangesButtonClick}
      >
        <span className="list-of-categories__edit-title">Категория</span>
        <div className="list-of-categories__edit">
          <Form.Item
            name="category"
            rules={inputRules.category}
            initialValue={category.selectedCategory.name}
          >
            <Input
              id="category"
              placeholder="Введите название категории"
              value={data.category}
              onInput={handleInputChange}
            />
          </Form.Item>
        </div>
        <span className="list-of-categories__edit-title">Описание</span>
        <div className="list-of-categories__edit">
          <Form.Item
            name="description"
            initialValue={category.selectedCategory.description}
          >
            <Input
              id="description"
              placeholder="Введите описание"
              value={data.description}
              onInput={handleInputChange}
            />
          </Form.Item>
        </div>
        <div className="list-of-categories__form-buttons">
          <Form.Item>
            <div>
              <Button
                type="default"
                htmlType="reset"
                onClick={handleDeleteClick}
                danger
              >
                Удалить
              </Button>
            </div>
            <div>
              <Button
                type="default"
                htmlType="submit"
                disabled={
                  data.category === category.selectedCategory.name
                  && data.description === category.selectedCategory.description
                }
              >
                Сохранить изменения
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
    </Modal>
  );
};

export default EditCategory;
