export const inputRules = {
  email: [
    {
      required: true,
      message: 'Пожалуйста введите почту для авторизации',
    },
    {
      pattern: new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|ru)/, 'g'),
      message: 'Введите корректный адрес почты',
    },
  ],
  password: [
    {
      required: true,
      message: 'Пожалуйста введите пароль для авторизации',
    },
  ],
};
