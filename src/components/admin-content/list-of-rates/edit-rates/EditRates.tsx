import {
  Modal, Form, Input, Button,
} from 'antd';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING } from '../../../../constants/common';
import { inputRules } from '../../../../constants/inputRules';
import {
  changeRatePriceAction, changeRateTypeAction, deleteRateAction, rateModalWindowStateAction, selectedRateDataCLearAction,
} from '../../../../redux/actions/EntityTypesAction';
import { entityTypesSelector } from '../../../../selectors/entityTypesSelector';

interface IRateFormResult {
  rate: string;
  unit: string;
  price: number;
}

const EditRates = () => {
  const dispatch = useDispatch();
  const { rates } = useSelector(entityTypesSelector);
  const [data, setData] = useState({
    rate: EMPTY_STRING,
    price: 0,
    unit: EMPTY_STRING,
  } as IRateFormResult);

  useEffect(() => {
    if (rates.selectedRate.id !== EMPTY_STRING) {
      setData({
        rate: rates.selectedRate.rateTypeId.name,
        price: rates.selectedRate.price,
        unit: rates.selectedRate.rateTypeId.unit,
      });
    }
  }, [rates.selectedRate]);

  const handleCancelClick = () => {
    dispatch(selectedRateDataCLearAction());
    setData({
      rate: EMPTY_STRING,
      price: 0,
      unit: EMPTY_STRING,
    });
  };

  const handleDeleteClick = () => {
    // TODO добавить обновление тарифов после удаления
    dispatch(deleteRateAction(rates.selectedRate.id, rates.selectedRate.rateTypeId.id));
    dispatch(selectedRateDataCLearAction());
    setData({
      rate: EMPTY_STRING,
      price: 0,
      unit: EMPTY_STRING,
    });
  };

  const handleSaveChangesButtonClick = (values: IRateFormResult) => {
    if (rates.selectedRate.price !== values.price
      && rates.selectedRate.rateTypeId.name === values.rate
      && rates.selectedRate.rateTypeId.unit === values.unit) {
      dispatch(changeRatePriceAction(
        rates.selectedRate.id, rates.selectedRate.rateTypeId.id, values.price, rates.changedDataIndex,
      ));
    }
    if (rates.selectedRate.price !== values.price
      && (rates.selectedRate.rateTypeId.name !== values.rate
      || rates.selectedRate.rateTypeId.unit !== values.unit)) {
      dispatch(changeRatePriceAction(
        rates.selectedRate.id, rates.selectedRate.rateTypeId.id, values.price, rates.changedDataIndex,
      ));
      dispatch(changeRateTypeAction(
        rates.selectedRate.rateTypeId.id, values.rate, values.unit, rates.changedDataIndex,
      ));
    }
    if (rates.selectedRate.price === values.price
      && (rates.selectedRate.rateTypeId.name !== values.rate
      || rates.selectedRate.rateTypeId.unit !== values.unit)) {
      dispatch(changeRateTypeAction(
        rates.selectedRate.rateTypeId.id, values.rate, values.unit, rates.changedDataIndex,
      ));
    }
    dispatch(rateModalWindowStateAction(false));
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    switch (event.target.id) {
      case 'rate': {
        setData((prevState) => ({ ...prevState, rate: event.target.value }));
        break;
      }
      case 'unit':
        setData((prevState) => ({ ...prevState, unit: event.target.value }));
        break;
      case 'price':
        setData((prevState) => ({ ...prevState, price: event.target.value }));
        break;
      default: break;
    }
  };

  return (
    <Modal
      className="list-of-rates__modal"
      title="Изменение тарифа"
      visible={rates.rateModalVisible}
      closable
      onCancel={handleCancelClick}
      footer={null}
    >
      <Form
        name="rate-form"
        onFinish={handleSaveChangesButtonClick}
      >
        <span className="list-of-rates__edit-title">Тариф</span>
        <div className="list-of-rates__edit">
          <Form.Item
            name="rate"
            rules={inputRules.rate}
            initialValue={rates.selectedRate.rateTypeId.name}
          >
            <Input
              id="rate"
              placeholder="Введите название тарифа"
              value={data.rate}
              onInput={handleInputChange}
            />
          </Form.Item>
        </div>
        <span className="list-of-rates__edit-title">Единица измерения</span>
        <div className="list-of-rates__edit">
          <Form.Item
            name="unit"
            rules={inputRules.unit}
            initialValue={rates.selectedRate.rateTypeId.unit}
          >
            <Input
              id="unit"
              placeholder="Введите единицу измерения"
              value={data.unit}
              onInput={handleInputChange}
            />
          </Form.Item>
        </div>
        <span className="list-of-rates__edit-title">Стоимость</span>
        <div className="list-of-rates__edit">
          <Form.Item
            name="price"
            rules={inputRules.price}
            initialValue={rates.selectedRate.price}
          >
            <Input
              id="price"
              placeholder="Введите стоимость тарифа"
              value={data.price}
              onInput={handleInputChange}
            />
          </Form.Item>
        </div>
        <div className="list-of-rates__form-buttons">
          {/* TODO добавить лоадер на кнопки при сохранении или удалении */}
          <Form.Item>
            <div>
              <Button
                type="default"
                htmlType="submit"
                disabled={
                  data.price === rates.selectedRate.price
                  && data.rate === rates.selectedRate.rateTypeId.name
                  && data.unit === rates.selectedRate.rateTypeId.unit
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
            <div>
              <Button
                type="primary"
                htmlType="reset"
                onClick={handleDeleteClick}
                danger
              >
                Удалить
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default EditRates;
