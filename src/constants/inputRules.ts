export const inputRules = {
  login: [
    {
      required: true,
      message: 'Пожалуйста введите логин для авторизации',
    },
  ],
  password: [
    {
      required: true,
      message: 'Пожалуйста введите пароль для авторизации',
    },
  ],
  carModel: [
    {
      required: true,
      message: 'Пожалуйста введите модель автомобиля',
    },
    {
      pattern: new RegExp(/^[A-z|А-я|0-9| ]*$/, 'g'),
      message: 'Используйте только буквы и цифры',
    },
  ],
  carType: [
    {
      required: true,
      message: 'Пожалуйста введите тип автомобиля',
    },
    {
      pattern: new RegExp(/^[А-я| ]*$/, 'g'),
      message: 'Используйте буквы кириллиического алфавита',
    },
  ],
  carColor: [
    {
      pattern: new RegExp(/^[А-я]*$/, 'g'),
      message: 'Используйте буквы кириллиического алфавита',
    },
  ],
  rate: [
    {
      required: true,
      message: 'Пожалуйста введите название тарифа',
    },
    {
      pattern: new RegExp(/^[А-я|0-9| ]*$/, 'g'),
      message: 'Используйте буквы кириллиического алфавита и пробелы',
    },
  ],
  unit: [
    {
      required: true,
      message: 'Пожалуйста введите единицу измерения тарифа',
    },
    {
      pattern: new RegExp(/^[A-z|А-я|0-9| ]*$/, 'g'),
      message: 'Используйте только буквы и цифры',
    },
  ],
  price: [
    {
      required: true,
      message: 'Пожалуйста введите стоимость тарифа',
    },
    {
      pattern: new RegExp(/^[0-9]*$/, 'g'),
      message: 'Используйте только цифры',
    },
  ],
};
