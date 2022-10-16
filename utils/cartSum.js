export function cartSum(cart, planters) {
  const amountPayable = cart
    .map((el) => {
      return planters.find((item) => item.id === el.id).price * el.count;
    })
    .reduce((el, sum) => el + sum, 0);
  return amountPayable;
}
