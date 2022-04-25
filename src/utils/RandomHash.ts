export const randomHash = () => {
  let result = '';
  let symbol = '';
  for (let i = 0; i < 7; i += 1) {
    switch (Math.round(Math.random() * (2))) {
      case 0:
        symbol = String.fromCharCode(Math.round(Math.random() * (57 - 48) + 48));
        break;
      case 1:
        symbol = String.fromCharCode(Math.round(Math.random() * (90 - 65) + 65));
        break;
      default:
        symbol = String.fromCharCode(Math.round(Math.random() * (122 - 97) + 97));
        break;
    }
    result += symbol;
  }
  return result;
};
