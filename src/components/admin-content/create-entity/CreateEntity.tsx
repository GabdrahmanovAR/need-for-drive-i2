import { Collapse } from 'antd';
import { isString, isUndefined } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING } from '../../../constants/common';
import { getPointsAction } from '../../../redux/actions/PointsDataAction';
import { successfullSaveStateAction } from '../../../redux/actions/SuccessfullSaveAction';
import { successfullSaveSelector } from '../../../selectors/successfulSaveSelector';
import CreateCategory from './create-category/CreateCategory';
import CreateCity from './create-city/CreateCity';
import CreatePoint from './create-point/CreatePoint';
import CreateRate from './create-rate/CreateRate';
import CreateStatus from './create-status/CreateStatus';
import './CreateEntity.scss';

const { Panel } = Collapse;

const CreateEntity = () => {
  const dispatch = useDispatch();
  const [activePanel, setActivePanel] = useState(EMPTY_STRING);
  const successfullSafeState = useSelector(successfullSaveSelector);

  useEffect(() => {
    dispatch(getPointsAction('cities'));
  }, []);

  const handlePanelClick = (key: string | string[]) => {
    if (isString(key)) setActivePanel(key);
    if (isUndefined(key)) setActivePanel(EMPTY_STRING);
    if (successfullSafeState.isActive) dispatch(successfullSaveStateAction(EMPTY_STRING, false));
  };

  return (
    <main className="create-entity">
      <h2>Создать новую сущность</h2>
      <section className="create-entity__info">
        <Collapse
          accordion
          activeKey={activePanel === EMPTY_STRING ? undefined : activePanel}
          onChange={handlePanelClick}
        >
          <Panel header="Категория автомобиля" key="1">
            <CreateCategory setActivePanel={setActivePanel} />
          </Panel>
          <Panel header="Город" key="2">
            <CreateCity setActivePanel={setActivePanel} />
          </Panel>
          <Panel header="Пункт выдачи" key="3">
            <CreatePoint setActivePanel={setActivePanel} />
          </Panel>
          <Panel header="Тариф" key="4">
            <CreateRate setActivePanel={setActivePanel} />
          </Panel>
          <Panel header="Статус" key="5">
            <CreateStatus setActivePanel={setActivePanel} />
          </Panel>
        </Collapse>
      </section>
    </main>
  );
};

export default CreateEntity;
