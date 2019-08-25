const purchases = document.getElementById('purchaseSum');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const tip = document.getElementById('tip');
const form = document.querySelector('.form');

const displayTotal = document.getElementById('displayTotal');
const displayTax = document.getElementById('displayTax');
const displayTip = document.getElementById('displayTip');

const calculate = () => {
  let percentage = purchases.value / subtotal.value;
  let totalOwedNoTip = total.value * percentage;
  let taxOwed = totalOwedNoTip - purchases.value;
  let tipOwed = totalOwedNoTip * (tip.value * .01);
  let totalOwed = totalOwedNoTip + tipOwed;

  if (isNaN(totalOwed) || !isFinite(totalOwed)) {
    displayTotal.innerText = '$0.00';
    displayTax.innerText = 'Tax: $0.00';
    displayTip.innerText = 'Tip: $0.00';
    console.log(totalOwed);
  } else {
    displayTotal.innerText = `$${totalOwed.toFixed(2)}`;
    displayTax.innerText = `Tax: $${taxOwed.toFixed(2)}`;
    displayTip.innerText = `Tip: $${tipOwed.toFixed(2)}`;
  }
}

calculate();
form.addEventListener('keyup', calculate);