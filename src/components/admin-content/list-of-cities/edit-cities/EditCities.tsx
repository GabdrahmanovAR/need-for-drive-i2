import {
  Modal, Form, Input, Button,
} from 'antd';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputRules } from '../../../../constants/inputRules';
import {
  changeCityAction, cityModalVisibleAction, clearSelectedCityAction, deleteCitytAction,
} from '../../../../redux/actions/PointsDataAction';
import { pointsDataSelector } from '../../../../selectors/pointsDataSelector';
import './EditCities.scss';

interface ICityFormResult {
  city: string;
}

const EditCities = () => {
  const dispatch = useDispatch();
  const { cities } = useSelector(pointsDataSelector);
  const [data, setData] = useState({} as ICityFormResult);

  useEffect(() => {
    if (cities.selectedCity.id) {
      setData({ city: cities.selectedCity.name });
    }
  }, [cities.selectedCity]);

  const handleCancelClick = () => {
    dispatch(clearSelectedCityAction());
    setData({} as ICityFormResult);
  };

  const handleDeleteClick = () => {
    dispatch(deleteCitytAction(cities.selectedCity.id));
    dispatch(clearSelectedCityAction());
    setData({} as ICityFormResult);
  };

  const handleSaveChangesButtonClick = (values: ICityFormResult) => {
    if (cities.selectedCity.name !== values.city) {
      dispatch(changeCityAction(cities.selectedCity.id, values.city));
    }
    dispatch(cityModalVisibleAction(false));
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    setData({ city: event.target.value });
  };

  return (
    <Modal
      className="modal"
      title="Изменение города"
      visible={cities.cityModalVisible}
      closable
      onCancel={handleCancelClick}
      footer={null}
      key={cities.changedIndexData}
    >
      <Form
        name="point-form"
        onFinish={handleSaveChangesButtonClick}
      >
        <span className="modal__edit-title">Название пункта выдачи</span>
        <div className="modal__edit">
          <Form.Item
            name="city"
            initialValue={cities.selectedCity.name}
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
        <div className="modal__form-buttons">
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
                disabled={data.city === cities.selectedCity.name}
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

export default EditCities;
