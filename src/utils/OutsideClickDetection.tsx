import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFocusedFieldAction } from '../redux/actions/InputFieldAction';
import { EMPTY_STRING } from '../constants/common';

export const outsideClickDetection = (ref: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(setFocusedFieldAction(EMPTY_STRING));
        console.log('You clicked outside!');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
