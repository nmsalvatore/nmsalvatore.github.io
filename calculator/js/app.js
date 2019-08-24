const purchases = document.getElementById('purchaseSum');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const tip = document.getElementById('tip');
const form = document.querySelector('.form');
const displayTotal = document.getElementById('displayTotal');

const calculate = () => {
  let percentage = purchases.value / subtotal.value;
  let totalOwedNoTip = total.value * percentage;
  let tipOwed = totalOwedNoTip * (tip.value * .01);
  let totalOwed = totalOwedNoTip + tipOwed;

  if (isNaN(totalOwed)) {
    displayTotal.innerText = '$0.00';
  } else {
    displayTotal.innerText =  `$${totalOwed.toFixed(2)}`;
  }
}

form.addEventListener('keyup', calculate);