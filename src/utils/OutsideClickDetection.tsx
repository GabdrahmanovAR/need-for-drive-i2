import { SetStateAction, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFocusedFieldAction } from '../redux/actions/FocusedItemAction';
import { EMPTY_STRING } from '../constants/common';

export const outsideClickDetection = (ref: any, callback?: SetStateAction<any>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event: any) {
      // TODO исправить постоянный вызов при клике вне компонента, когда компонент уже закрыт
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setFocusedFieldAction(EMPTY_STRING));
        callback(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
