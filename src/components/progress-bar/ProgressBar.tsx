import React, { CSSProperties, FC } from 'react';
import './ProgressBar.scss';

interface IProgressBarProps {
  progressBarWidth: string;
}

const ProgressBar: FC<IProgressBarProps> = ({ progressBarWidth }) => {
  const progressBarStyle: CSSProperties = {
    width: progressBarWidth,
  };

  return (
    <div className="progress-bar">
      <span
        className="progress-bar__bar"
        style={progressBarStyle}
      />
    </div>
  );
};

export default ProgressBar;
