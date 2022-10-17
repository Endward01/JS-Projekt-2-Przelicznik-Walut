const inptValue = document.querySelector(".input");
const loaderClass = document.querySelector(".loader-outer").classList;
const alertText = "Something went wrong with the request, please try again.";

document.querySelector(".btn").addEventListener("click", loadRate);

loadList();

async function checkValue(e) {
  return (code = e.value);
}
function multiplyValue(a, b) {
  return (a * b).toFixed(2);
}
async function loadList() {
  loaderClass.remove("hidden");
  loaderClass.add("d-flex");

  await getExchangeRates();

  loaderClass.add("hidden");
  loaderClass.remove("d-flex");
}
async function loadRate() {
  loaderClass.remove("hidden");
  loaderClass.add("d-flex");

  await getSpecificRate();

  loaderClass.add("hidden");
  loaderClass.remove("d-flex");
}
async function getExchangeRates() {
  try {
    const data = await fetch("https://api.nbp.pl/api/exchangerates/tables/A/");
    const dataJson = await data.json();
    const allRatesArr = dataJson[0].rates;
    allRatesArr.forEach(({ code, currency }) => {
      const option = document.createElement("option");
      option.setAttribute("value", code);
      option.classList.add("option");
      option.textContent = `${code} (${currency})`;
      document.querySelector(".select-currancy").appendChild(option);
    });
  } catch (error) {
    console.error(error);
    window.alert(alertText);
  }
}
async function getSpecificRate() {
  try {
    let code = await checkValue(document.querySelector(".select-currancy"));
    const data = await fetch(
      `https://api.nbp.pl/api/exchangerates/rates/A/${code}/`
    );
    const dataJson = await data.json();
    const rateCurr = dataJson.rates[0];
    document.querySelector(".h4").textContent = `${inptValue.valueAsNumber.toFixed(2)} ${code} to ${multiplyValue(inptValue.value, rateCurr.mid)} PLN`;
  } catch (error) {
    console.error(error);
    window.alert(alertText);
  }
}
