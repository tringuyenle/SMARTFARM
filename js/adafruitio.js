updateData("https://io.adafruit.com/api/v2/tringuyennek/feeds")

async function fetch_api(url, idspam) {
    let x = await fetch(url);
    let y = await x.json();
    document.getElementById(idspam).innerHTML = y.last_value;
}

async function updateData(url) {
  fetch_api(url + "/anh-sang", "anh-sang");
  fetch_api(url + "/nhiet-do", "nhiet-do");
  fetch_api(url + "/do-am-khong-khi", "do-am-khong-khi");
  fetch_api(url + "/do-am-dat", "do-am-dat");
  setInterval(function () {fetch_api(url + "/anh-sang", "anh-sang"); fetch_api(url + "/nhiet-do", "nhiet-do"); fetch_api(url + "/do-am-khong-khi", "do-am-khong-khi"); fetch_api(url + "/do-am-dat", "do-am-dat");}, 1000);
  // setInterval(function () {fetch_api(url + "/nhiet-do", "nhiet-do");}, 1000);
  // setInterval(function () {fetch_api(url + "/do-am-khong-khi", "do-am-khong-khi");}, 1000);
  // setInterval(function () {fetch_api(url + "/do-am-dat", "do-am-dat");}, 1000);
}