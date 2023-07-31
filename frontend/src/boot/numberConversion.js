import { boot } from 'quasar/wrappers'
export default boot(({ app }) => {
  const convertNumberIntoDecimal = function (num) {
    // Nine Zeroes for Billions
    if(!num){
      return 0
    }
    return Math.abs(Number(num)) >= 1.0e9
      ? Number((Math.abs(Number(num)) / 1.0e9).toFixed(2)) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(num)) >= 1.0e6
        ? Number((Math.abs(Number(num)) / 1.0e6).toFixed(2)) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(num)) >= 1.0e3
          ? Number((Math.abs(Number(num)) / 1.0e3).toFixed(2)) + "K"
          : Math.abs(Number(num));
  };

  app.config.globalProperties.$convertNumberIntoDecimal = convertNumberIntoDecimal
  app.config.globalProperties.$currency_sign = '৳'
})
