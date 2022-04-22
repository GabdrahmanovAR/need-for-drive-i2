import React, { FC } from 'react';
import cn from 'classnames';
import './Spinner.scss';
import { EMPTY_STRING } from '../../constants/common';

interface ISpinnerProps {
  customClass?: string;
}

const Spinner: FC<ISpinnerProps> = ({ customClass }) => {
  const classNameLoader = cn('loader', {
    [customClass || EMPTY_STRING]: customClass !== EMPTY_STRING,
  });

  return (
    <div className="spinner">
      <div className={classNameLoader} />
    </div>
  );
};

export default Spinner;
