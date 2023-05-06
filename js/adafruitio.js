updateData("https://io.adafruit.com/api/v2/tringuyennek/feeds")

async function fetch_api(url, idspam) {
    let x = await fetch(url);
    let y = await x.json();
    document.getElementById(idspam).innerHTML = y.last_value;
}

async function buttoncheck(url, idspan) {
  let x = await fetch(url);
  let y = await x.json();
  if (y.last_value == 1) {
    document.getElementById(idspan).checked = true;
    if (idspan == 'auto') hidebtn(true);
  }
  else document.getElementById(idspan).checked = false;
}

async function updateData(url) {
  fetch_api(url + "/anh-sang", "anh-sang");
  fetch_api(url + "/nhiet-do", "nhiet-do");
  fetch_api(url + "/do-am-khong-khi", "do-am-khong-khi");
  fetch_api(url + "/do-am-dat", "do-am-dat");
  buttoncheck(url + "/b-ng-den", "bong-den");
  buttoncheck(url + "/may-bom", "may-bom");
  buttoncheck(url + "/tinh-trang", "auto");
  setInterval(function () 
  {fetch_api(url + "/anh-sang", "anh-sang"); 
  fetch_api(url + "/nhiet-do", "nhiet-do"); 
  fetch_api(url + "/do-am-khong-khi", "do-am-khong-khi"); 
  fetch_api(url + "/do-am-dat", "do-am-dat");}, 1000);
}

async function button(feed, status) {
  if (status) status = 1
  else status = 0;

  fetch("https://io.adafruit.com/api/v2/tringuyennek/feeds/" + feed + "/data", {
  method: 'POST',
  headers: {
      'X-AIO-Key': "aio_kgAc827hGozCVrxabIaQOAdG5Rcs",
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({value: status,})
  })
  .then(response => console.log(response.status))
  .catch(error => console.error(error));
}