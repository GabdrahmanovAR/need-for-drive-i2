import {
  Modal, Form, Input, Button,
} from 'antd';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePointsAction,
  clearSelectedPointAction,
  deletePointAction,
  pointModalVisibleAction,
} from '../../../../redux/actions/PointsDataAction';
import { pointsDataSelector } from '../../../../selectors/pointsDataSelector';
import './EditPoint.scss';

interface IPointFormResult {
  point: string;
  address: string;
}

const EditPoint = () => {
  const dispatch = useDispatch();
  const { points } = useSelector(pointsDataSelector);
  const [data, setData] = useState({} as IPointFormResult);

  useEffect(() => {
    if (points.selectedPoint.id) {
      setData({
        point: points.selectedPoint.name,
        address: points.selectedPoint.address,
      });
    }
  }, [points.selectedPoint]);

  const handleCancelClick = () => {
    dispatch(clearSelectedPointAction());
    setData({} as IPointFormResult);
  };

  const handleDeleteClick = () => {
    dispatch(deletePointAction(points.selectedPoint.id));
    dispatch(clearSelectedPointAction());
    setData({} as IPointFormResult);
  };

  const handleSaveChangesButtonClick = (values: IPointFormResult) => {
    if (points.selectedPoint.name !== values.point || points.selectedPoint.address !== values.address) {
      dispatch(changePointsAction(points.selectedPoint.id, values.point, values.address, points.selectedPoint.cityId.id));
    }
    dispatch(pointModalVisibleAction(false));
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    switch (event.target.id) {
      case 'point': {
        setData((prevState) => ({ ...prevState, point: event.target.value }));
        break;
      }
      case 'address':
        setData((prevState) => ({ ...prevState, address: event.target.value }));
        break;

      default: console.log('Input Error'); break;
    }
  };

  return (
    <Modal
      className="modal"
      title="Изменение пункта выдачи"
      visible={points.pointModalVisible}
      closable
      onCancel={handleCancelClick}
      footer={null}
      key={points.changedIndexData}
    >
      <Form
        name="point-form"
        onFinish={handleSaveChangesButtonClick}
      >
        <span className="modal__edit-title">Название пункта выдачи</span>
        <div className="modal__edit">
          <Form.Item
            name="point"
            initialValue={points.selectedPoint.name}
          >
            <Input
              id="point"
              placeholder="Введите название категории"
              value={data.point}
              onInput={handleInputChange}
            />
          </Form.Item>
        </div>
        <span className="modal__edit-title">Адрес пункта выдачи</span>
        <div className="modal__edit">
          <Form.Item
            name="address"
            initialValue={points.selectedPoint.address}
          >
            <Input
              id="address"
              placeholder="Введите единицу измерения"
              value={data.address}
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
                disabled={
                  data.point === points.selectedPoint.name
                  && data.address === points.selectedPoint.address
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

export default EditPoint;
