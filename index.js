const inptValue = document.querySelector(".input");

document.querySelector(".btn").addEventListener("click", loadRate);

loadList();

async function check(e) {
  return (code = e.value);
}
function makeMagic(a, b) {
  return (a * b).toFixed(2);
}
async function loadList() {
  document.querySelector(".loader-outer").classList.remove("hidden");
  document.querySelector(".loader-outer").classList.add("d-flex");

  await getExchangeRates();

  document.querySelector(".loader-outer").classList.add("hidden");
  document.querySelector(".loader-outer").classList.remove("d-flex");
}
async function loadRate() {
  document.querySelector(".loader-outer").classList.remove("hidden");
  document.querySelector(".loader-outer").classList.add("d-flex");

  await getSpecificRate();

  document.querySelector(".loader-outer").classList.add("hidden");
  document.querySelector(".loader-outer").classList.remove("d-flex");
}
async function getExchangeRates() {
  try {
    const data = await fetch("https://api.nbp.pl/api/exchangerates/tables/A/");
    const dataJson = await data.json();
    const allRatesArr = dataJson[0].rates;
    console.table(allRatesArr);
    for (let i = 0; i < allRatesArr.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", `${allRatesArr[i].code}`);
      option.classList.add("option");
      option.classList.add("option-" + `${allRatesArr[i].code}`);
      option.textContent =
        `${allRatesArr[i].code}` + " (" + `${allRatesArr[i].currency}` + ")";
      document.querySelector(".select-currancy").appendChild(option);
    }
  } catch (error) {
    console.error(error);
    window.alert("Oh something went wrong, please try again (check consol for more information)");
  }
}
async function getSpecificRate() {
  try {
    let code = await check(document.querySelector(".select-currancy"));
    const data = await fetch(
      "https://api.nbp.pl/api/exchangerates/rates/A/" + `${code}` + "/"
    );
    const dataJson = await data.json();
    console.table(dataJson);
    const rateCurr = dataJson.rates[0];
    console.table(rateCurr);
    document.querySelector(".h4").textContent =
      `${inptValue.valueAsNumber.toFixed(2)}` +
      " " +
      `${code}` +
      " to " +
      `${makeMagic(inptValue.value, rateCurr.mid)}` +
      " PLN";
  } catch (error) {
    console.error(error);
    window.alert("Oh something went wrong, please try again (check consol for more information)");
  }
}
