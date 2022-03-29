import React, { useState } from 'react';
import './LangButton.scss';
import { ENG_LANG, RU_LANG } from '../../constants/common';

const LangButton = () => {
  const [langActive, setLangActive] = useState(ENG_LANG);

  const handleLangChange = () => {
    setLangActive(langActive === ENG_LANG ? RU_LANG : ENG_LANG);
  };

  return (
    <button
      type="button"
      className="lang-btn"
      onClick={handleLangChange}
    >
      {langActive}
    </button>
  );
};

export default LangButton;
