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
}

async function fanspeech(url, speech) {
  let x = await fetch(url);
  let y = await x.json();
  if (y.last_value == 1) {
    document.getElementById("fanspeech").innerHTML = speech;
  }
}

async function updateData(url) {
  fetch_api(url + "/anh-sang", "anh-sang");
  fetch_api(url + "/nhiet-do", "nhiet-do");
  fetch_api(url + "/do-am-khong-khi", "do-am-khong-khi");
  fetch_api(url + "/do-am-dat", "do-am-dat");
  buttoncheck(url + "/b-ng-den", "bong-den");
  buttoncheck(url + "/may-bom", "may-bom");
  buttoncheck(url + "/tinh-trang", "auto");
  buttoncheck(url + "/quat1", "quat");
  buttoncheck(url + "/quat2", "quat");
  buttoncheck(url + "/quat3", "quat");
  fanspeech(url + "/quat1", 1)
  fanspeech(url + "/quat2", 2)
  fanspeech(url + "/quat3", 3)
  setInterval(function () 
  {fetch_api(url + "/anh-sang", "anh-sang"); 
  fetch_api(url + "/nhiet-do", "nhiet-do"); 
  fetch_api(url + "/do-am-khong-khi", "do-am-khong-khi"); 
  fetch_api(url + "/do-am-dat", "do-am-dat");}, 5000);
}

async function button(feed, status) {
  if (status) status = 1
  else status = 0;

  fetch("https://io.adafruit.com/api/v2/tringuyennek/feeds/" + feed + "/data", {
  method: 'POST',
  headers: {
      'X-AIO-Key': "aio_dlOk274ZEfjB65xlGg88XLPrI9N8",
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({value: status,})
  })
  .then(response => console.log(response.status))
  .catch(error => console.error(error));
}