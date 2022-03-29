import React, { BaseSyntheticEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY_STRING, EmptyFuncType } from '../../constants/common';
import deleteIcon from '../../assets/icons/delete-city.svg';
import './InputField.scss';
import { setFocusedFieldAction } from '../../redux/actions/InputFieldAction';
import { inputFieldSelector } from '../../selectors/inputFieldSelector';

interface IInputFieldProps {
  title: string,
  fieldValue: string,
  placeholder: string,
  id: string,
  onInputFunc?: (e: BaseSyntheticEvent) => void,
  onClickInputFunc?: EmptyFuncType,
  onClickBtnFunc?: EmptyFuncType,
  childComponent?: React.ReactNode,
}

const InputField: FC<IInputFieldProps> = (props) => {
  const {
    title,
    fieldValue,
    placeholder,
    id,
    onInputFunc,
    onClickInputFunc,
    onClickBtnFunc,
    childComponent,
  } = props;
  const dispatch = useDispatch();
  const inputFieldState = useSelector(inputFieldSelector);

  const handleInputFieldClick = (event: BaseSyntheticEvent) => {
    if (inputFieldState.focusedField === event.currentTarget.id) return;
    dispatch(setFocusedFieldAction(event.currentTarget.id));
  };

  return (
    <div
      id={id}
      className="input-field"
      onClick={handleInputFieldClick}
      role="presentation"
    >
      <span className="input-field__title">{title}</span>
      <div className="input-field__container">
        <div>
          <input
            className="input-field__input"
            type="text"
            value={fieldValue}
            placeholder={placeholder}
            onInput={onInputFunc}
            onClick={onClickInputFunc}
          />
          <button
            type="button"
            className="input-field__close-btn"
            onClick={onClickBtnFunc}
          >
            <img
              className={`
                input-field__close-btn__icon 
                ${fieldValue !== EMPTY_STRING && 'input-field__close-btn__icon_active'}`}
              src={deleteIcon}
              alt="Delete"
            />
          </button>
        </div>
        {childComponent}
      </div>
    </div>
  );
};

export default InputField;
