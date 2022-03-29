import React, { FC } from 'react';
import './Spinner.scss';
import { EMPTY_STRING } from '../../constants/common';

interface ISpinnerProps {
  customClass?: string;
}

const Spinner: FC<ISpinnerProps> = ({ customClass }) => (
  <div className="spinner">
    <div className={`loader ${customClass !== EMPTY_STRING && customClass}`} />
  </div>
);

export default Spinner;
