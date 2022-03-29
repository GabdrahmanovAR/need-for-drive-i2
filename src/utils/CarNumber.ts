export const CarNumber = (carNumber: string) => {
  const regex = /[A-zА-я](?=[0-9])|[0-9](?=[A-zА-я])/g;

  return carNumber.toUpperCase().replace(regex, '$& ');
};
