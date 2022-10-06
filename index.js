const optEUR = document.querySelector(".option-eur");
const optUSD = document.querySelector(".option-usd");
const optCHF = document.querySelector(".option-chf");
const selectCUR = document.querySelector(".select-currancy");
const convertBTN = document.querySelector(".btn");
const inptValue = document.querySelector(".input");
const h4 = document.querySelector(".h4");

function findObj(arr, key, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return arr[i];
    }
  }
  return null;
}
async function check(e) {
  return (code = e.value);
}
function makeMagic(a, b) {
  return (a * b).toFixed(2);
}

convertBTN.addEventListener("click", loader);
function loader() {
  document.querySelector(".loader-outer").classList.remove("hidden");
  document.querySelector(".loader-outer").classList.add("d-flex");
  setTimeout(() => {
    getExchangeRates();
    document.querySelector(".loader-outer").classList.add("hidden");
    document.querySelector(".loader-outer").classList.remove("d-flex");
  }, 2000);
  // getExchangeRates()
  // document.querySelector(".loader-outer").classList.add("hidden");
  // document.querySelector(".loader-outer").classList.remove("d-flex");
}
async function getExchangeRates() {
  try {
    const curResponse = await fetch(
      "https://api.nbp.pl/api/exchangerates/tables/A/"
    );
    const finaleCurResponse = await curResponse.json();
    const allRatesArr = finaleCurResponse[0].rates;
    let code = await check(selectCUR);
    let rate = findObj(allRatesArr, "code", code);
    h4.textContent =
      `${inptValue.valueAsNumber.toFixed(2)}` +
      " " +
      `${rate.code}` +
      " to " +
      `${makeMagic(inptValue.value, rate.mid)}` +
      " PLN";
  } catch (error) {
    console.error(error);
  }
}
