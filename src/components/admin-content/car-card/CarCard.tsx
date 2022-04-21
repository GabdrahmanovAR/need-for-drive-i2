import React, { useEffect, useState } from 'react';
import {
  Button, Form, Input, Upload,
} from 'antd';
import { RcFile } from 'antd/lib/upload';
import carImage from '../../../assets/images/car.png';
import './CarCard.scss';
import ProgressBar from '../../progress-bar/ProgressBar';

const CarCard = () => {
  const [file, setFile] = useState({} as RcFile);
  const [progressBarWidth, setProgressBarWidth] = useState('0%');

  useEffect(() => {
    setProgressBarWidth('74%');
  });

  useEffect(() => {
    if (file.name) {
      console.log(file);
    }
  }, [file]);

  const handleUploadingFile = (uploadedFile: RcFile) => {
    setFile(uploadedFile);
  };

  return (
    <div className="admin-car-card">
      <h2>Карточка автомобиля</h2>
      <Form className="admin-car-card__form">
        <div className="admin-car-card__form__description">
          <div className="admin-car-card__form__description__img">
            <img src={carImage} alt="Car" />
            <h2>Hyndai, i30 N</h2>
            <p>Компакт-кар</p>
            <div className="admin-car-card__form__description__img__upload">
              <Upload
                name="image-file"
                beforeUpload={handleUploadingFile}
                accept=".bmp, .jpeg, .jpg, .png"
                showUploadList={false}
              >
                <Input
                  value={file && file.name}
                  placeholder="Выберите файл..."
                  suffix={<div className="upload-button">Обзор</div>}
                />
              </Upload>
            </div>
          </div>
          <div className="admin-car-card__form__description__progress">
            <div>
              <p>Заполнено</p>
              <p>{progressBarWidth}</p>
            </div>
            <ProgressBar progressBarWidth={progressBarWidth} />
          </div>
          <div className="admin-car-card__form__description__text">
            <p>Описание</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Odio eaque, quidem, commodi soluta qui quae quod dolorum sint alias,
              possimus illum assumenda eligendi cumque?
            </p>
          </div>
        </div>
        <div className="admin-car-card__form__settings">
          <div>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="reset">
                Отменить
              </Button>
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              <Button type="primary" htmlType="button" danger>
                Удалить
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CarCard;
