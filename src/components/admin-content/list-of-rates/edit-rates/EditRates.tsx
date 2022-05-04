import {
  Modal, Form, Input, Button,
} from 'antd';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING } from '../../../../constants/common';
import { inputRules } from '../../../../constants/inputRules';
import {
  changeRatePriceAction, loadRatesAction, rateModalWindowStateAction, selectedRateDataCLearAction,
} from '../../../../redux/actions/EntityTypesAction';
import { entityTypesSelector } from '../../../../selectors/entityTypesSelector';

interface IRateFormResult {
  rate: string;
  unit: string;
  price: number;
}

const EditRates = () => {
  const dispatch = useDispatch();
  const { selectedRate, rateModalVisible } = useSelector(entityTypesSelector);
  const [data, setData] = useState({
    rate: EMPTY_STRING,
    price: 0,
    unit: EMPTY_STRING,
  } as IRateFormResult);

  useEffect(() => {
    if (selectedRate.id !== EMPTY_STRING) {
      setData({
        rate: selectedRate.rateTypeId.name,
        price: selectedRate.price,
        unit: selectedRate.rateTypeId.unit,
      });
    }
  }, [selectedRate]);

  const handleCancelClick = () => {
    dispatch(selectedRateDataCLearAction());
    setData({
      rate: EMPTY_STRING,
      price: 0,
      unit: EMPTY_STRING,
    });
  };

  const handleSaveChangesButtonClick = (values: IRateFormResult) => {
    console.log(values);
    dispatch(changeRatePriceAction(selectedRate.id, selectedRate.rateTypeId.id, values.price));
    dispatch(loadRatesAction());
    dispatch(rateModalWindowStateAction(false));
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    switch (event.target.id) {
      case 'rate': {
        setData((prevState) => ({ ...prevState, rate: event.target.value }));
        console.log(event.target.value);
        break;
      }
      case 'unit':
        setData((prevState) => ({ ...prevState, unit: event.target.value }));
        console.log(event.target.value);
        break;
      case 'price':
        setData((prevState) => ({ ...prevState, price: event.target.value }));
        console.log(event.target.value);
        break;
      default: break;
    }
  };

  return (
    <Modal
      className="list-of-rates__modal"
      title="Изменение тарифа"
      visible={rateModalVisible}
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
            initialValue={selectedRate.rateTypeId.name}
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
            initialValue={selectedRate.rateTypeId.unit}
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
            initialValue={selectedRate.price}
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
          <Form.Item>
            <div>
              <Button
                type="default"
                htmlType="submit"
                disabled={
                  data.price === selectedRate.price
                  && data.rate === selectedRate.rateTypeId.name
                  && data.unit === selectedRate.rateTypeId.unit
                }
              >
                Сохранить изменения
              </Button>
            </div>
            <div>
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

export default EditRates;
