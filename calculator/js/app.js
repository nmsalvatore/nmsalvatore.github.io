const sumOfPurchases = document.getElementById('sum-of-purchases');
const billSubtotal = document.getElementById('bill-subtotal');
const billTotal = document.getElementById('bill-total');
const tipAmount = document.getElementById('tip-amount');
const form = document.getElementById('calculation-form');
const finalTotal = document.getElementById('final-total');

const displayPersonalSubtotal = document.getElementById('display-personal-subtotal');
const displayTax = document.getElementById('display-tax');
const displayTip = document.getElementById('display-tip');

const calculateBillPortion = () => {
  let personalPercentage = sumOfPurchases.value / billSubtotal.value;
  let personalTotalWithoutTip = billTotal.value * personalPercentage;
  let personalTip = personalTotalWithoutTip * (tipAmount.value * .01);
  let personalTotalWithTip = personalTotalWithoutTip + personalTip;

  if (isNaN(personalTotalWithTip)) {
    finalTotal.innerText = "$0.00";
  } else {
    finalTotal.innerText = "$" + personalTotalWithTip.toFixed(2);
  }
}

form.addEventListener('keyup', calculateBillPortion);