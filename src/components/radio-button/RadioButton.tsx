import React, { BaseSyntheticEvent, FC } from 'react';
import './RadioButton.scss';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING } from '../../constants/common';
import {
  setBabyChairAction,
  setCarColorAction,
  setFullTankAction, setRightHandDriveAction,
  setTariffAction,
} from '../../redux/actions/OrderInfoAction';
import {
  changeSelectedItem, radioBtnAdvIdAction,
  radioBtnCarIdAction,
  radioBtnColorIdAction,
  radioBtnTariffIdAction,
} from '../../redux/actions/RadioButtonAction';
import { orderInfoSelector } from '../../selectors/orderInfoSelector';
import { IsChecked } from '../../utils/IsChecked';
import { radioButtonSelector } from '../../selectors/radioButtonSelector';
import { rateSelector } from '../../selectors/rateSelector';
import { RateId } from '../../utils/RateId';

interface IRadioButtonProps {
  formName: string,
  btnNames: string[],
  type?: string,
  direction?: string,
}

const RadioButton: FC<IRadioButtonProps> = (props) => {
  const {
    formName,
    btnNames,
    type = 'radio',
    direction = EMPTY_STRING,
  } = props;
  const { car } = useSelector(orderInfoSelector);
  const rateState = useSelector(rateSelector);
  const radioBtnState = useSelector(radioButtonSelector);
  const dispatch = useDispatch();

  const handleOnChangeEvent = (event: BaseSyntheticEvent) => {
    if (event.target.id.includes('cars')) dispatch(radioBtnCarIdAction(event.target.id));
    if (event.target.id.includes('color')) {
      dispatch(setCarColorAction(event.target.value));
      dispatch(radioBtnColorIdAction(event.target.id));
    }
    if (event.target.id.includes('tariff')) {
      dispatch(setTariffAction(event.target.value, RateId(rateState.data, event.target.value)));
      dispatch((radioBtnTariffIdAction(event.target.id)));
    }
    if (event.target.id.includes('advanced')) {
      dispatch(radioBtnAdvIdAction(event.target.id));
    }

    switch (event.target.value) {
      case 'Все модели': dispatch(changeSelectedItem('all'));
        break;
      case 'Эконом': dispatch(changeSelectedItem('economy'));
        break;
      case 'Премиум': dispatch(changeSelectedItem('premium'));
        break;
      case 'Полный бак, 500₽': dispatch(setFullTankAction(!car.fullTank));
        break;
      case 'Детское кресло, 200₽': dispatch(setBabyChairAction(!car.babyChair));
        break;
      case 'Правый руль, 1600₽': dispatch(setRightHandDriveAction(!car.rightHandDrive));
        break;
      default:
    }
  };

  return (
    <form className="form_radio">
      <fieldset className={`form_radio__fieldset ${direction !== EMPTY_STRING && 'form_radio__fieldset_column'}`}>
        {btnNames.map((name: string, index: number) => (
          <div key={`radio-${index}`} className="form_radio__fieldset__r-button">
            <input
              id={`${type === 'radio'
                ? `radio-${formName}-${index}`
                : `checkbox-${formName}-${index}`
              }`}
              className={`form_radio__fieldset__input ${type === 'checkbox' && 'form_radio__fieldset__input_checkbox'}`}
              type={type}
              name={`${type === 'radio'
                ? 'radio-button'
                : `checkbox-btn-${index}`
              }`}
              onChange={handleOnChangeEvent}
              value={name && name[0].toUpperCase() + name.slice(1)}
              checked={IsChecked(type, index, formName, radioBtnState)}
            />
            <span className={`
              form_radio__fieldset__name 
              ${IsChecked(type, index, formName, radioBtnState) && 'form_radio__fieldset__name_active'}`}
            >
              {name && name[0].toUpperCase() + name.slice(1)}
            </span>
          </div>
        ))}
      </fieldset>
    </form>
  );
};

export default RadioButton;
