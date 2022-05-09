import {
  Modal, Form, Input, Button,
} from 'antd';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputRules } from '../../../../constants/inputRules';
import {
  changeStatusAction, deleteStatusAction, selectedStatusDataCLearAction, statusModalWindowStateAction,
} from '../../../../redux/actions/EntityTypesAction';
import { entityTypesSelector } from '../../../../selectors/entityTypesSelector';
import './EditStatus.scss';

interface IStatusFormResult {
  status: string;
}

const EditStatus = () => {
  const dispatch = useDispatch();
  const { statusList } = useSelector(entityTypesSelector);
  const [data, setData] = useState({} as IStatusFormResult);

  useEffect(() => {
    if (statusList.selectedStatus.id) {
      setData({ status: statusList.selectedStatus.name });
    }
  }, [statusList.selectedStatus]);

  const handleCancelClick = () => {
    dispatch(selectedStatusDataCLearAction());
    setData({} as IStatusFormResult);
  };

  const handleDeleteClick = () => {
    dispatch(deleteStatusAction(statusList.selectedStatus.id));
    dispatch(selectedStatusDataCLearAction());
    setData({} as IStatusFormResult);
  };

  const handleSaveChangesButtonClick = (values: IStatusFormResult) => {
    if (statusList.selectedStatus.name !== values.status) {
      dispatch(changeStatusAction(statusList.selectedStatus.id, values.status));
    }
    dispatch(statusModalWindowStateAction(false));
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    setData({ status: event.target.value });
  };

  return (
    <Modal
      className="modal"
      title="Изменение статуса"
      visible={statusList.statusModalVisible}
      closable
      onCancel={handleCancelClick}
      footer={null}
      key={statusList.changedDataIndex}
    >
      <Form
        name="point-form"
        onFinish={handleSaveChangesButtonClick}
      >
        <span className="modal__edit-title">Название пункта выдачи</span>
        <div className="modal__edit">
          <Form.Item
            name="status"
            initialValue={statusList.selectedStatus.name}
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
                disabled={data.status === statusList.selectedStatus.name}
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

export default EditStatus;
