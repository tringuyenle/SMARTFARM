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
  else {
    document.getElementById(idspan).checked = false;
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
  text = await fetch("http://localhost:3000/DataServers")
  server = await text.json()

  anhsang = server[0].ListAPI[1].LinkAPI
  nhietdo = server[0].ListAPI[2].LinkAPI
  doamkk = server[0].ListAPI[3].LinkAPI
  doamdat = server[0].ListAPI[4].LinkAPI
  bongden = server[0].ListAPI[5].LinkAPI
  maybom = server[0].ListAPI[0].LinkAPI
  tinhtrang = server[0].ListAPI[6].LinkAPI
  quat1 = server[0].ListAPI[7].LinkAPI
  quat2 = server[0].ListAPI[8].LinkAPI
  quat3 = server[0].ListAPI[9].LinkAPI
  fetch_api(url + "/" + anhsang, "anh-sang");
  fetch_api(url + "/" +nhietdo, "nhiet-do");
  fetch_api(url + "/" +doamkk, "do-am-khong-khi");
  fetch_api(url + "/" +doamdat, "do-am-dat");
  buttoncheck(url + "/"+bongden, "bong-den");
  buttoncheck(url + "/"+maybom, "may-bom");
  buttoncheck(url + "/" + tinhtrang, "auto");
  buttoncheck(url + "/" +quat1, "quat");
  buttoncheck(url + "/" +quat2, "quat");
  buttoncheck(url + "/" + quat3, "quat");
  fanspeech(url + "/"+quat1, 1)
  fanspeech(url + "/" + quat2, 2)
  fanspeech(url + "/" +quat3, 3)
  setInterval(function () 
  {fetch_api(url + "/" + anhsang, "anh-sang"); 
  fetch_api(url + "/" + nhietdo, "nhiet-do"); 
  fetch_api(url + "/" + doamkk, "do-am-khong-khi"); 
  fetch_api(url + "/" + doamdat, "do-am-dat");}, 1000);
}

async function button(feed, status) {
  text1 = await fetch("http://localhost:3000/DataServers")
  let server = await text1.json()
  let address = server[0].Address
  if (status) status = 1
  else status = 0;

  fetch(address + feed + "/data", {
  method: 'POST',
  headers: {
      'X-AIO-Key': server[0].Key,
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({value: status,})
  })
  .then(response => console.log(response.status))
  .catch(error => console.error(error));
}
let checkden = false
let checkquat = false
let checkbom = false
async function autocheck(){
  text1 = await fetch("http://localhost:3000/DataServers")
  let server = await text1.json()
  let address = server[0].Address
  let anhsang = server[0].ListAPI[1].LinkAPI
  let nhietdo = server[0].ListAPI[2].LinkAPI
  let doamkk = server[0].ListAPI[3].LinkAPI
  let doamdat = server[0].ListAPI[4].LinkAPI
  let bongden = server[0].ListAPI[5].LinkAPI
  let maybom = server[0].ListAPI[0].LinkAPI
  let tinhtrang = server[0].ListAPI[6].LinkAPI
  let quat1 = server[0].ListAPI[7].LinkAPI
  let quat2 = server[0].ListAPI[8].LinkAPI
  let quat3 = server[0].ListAPI[9].LinkAPI

  text = await fetch("http://localhost:3000/DataSchedules")
  schedule = await text.json()
  for(i=0;i<schedule.length;i++){
    let now = new Date()
      nowday = now.getDate()
      nowyear = now.getFullYear()
      nowmon = now.getMonth()+1
      nowhours = now.getHours()+1
      nowminute = now.getMinutes()+1
      let startday = new Date(schedule[i].StartDay)
      startdayday = startday.getDate()
      startdayyear = startday.getFullYear()
      startdaymon = startday.getMonth()+1
      startdayhours = startday.getHours()+1
      startdayminute = startday.getMinutes()+1
    if(schedule[i].Type=="Den"){

      
      let endday = ""
      if(schedule[i].EndDay != null){
        endday = new Date(schedule[i].EndDay)
      }

      if(schedule[i].Minute != null){
        endday = new Date(schedule[i].StartDay)
        endday.setMinutes(endday.getMinutes()+schedule[i].Minute )
      }
      if (nowday == startdayday && nowyear==startdayyear && nowmon == startdaymon && nowhours ==startdayhours && nowminute==startdayminute){
        if(checkden == false){
          button(bongden, true)
          buttoncheck(address+bongden,"bong-den" )
          checkden = true
        }
        
      }
      if(endday!=""){
        enddayday = endday.getDate()
        enddayyear = endday.getFullYear()
        enddaymon = endday.getMonth()+1
        enddayhours = endday.getHours()+1
        enddayminute = endday.getMinutes()+1
        if (nowday == enddayday && nowyear==enddayyear && nowmon == enddaymon && nowhours ==enddayhours && nowminute==enddayminute){
          if(checkden==true){
            button(bongden, false)
            buttoncheck(address+bongden,"bong-den" )
            checkden=false
          }
        }
      }
      
      
    }
    else if(schedule[i].Type=="Maybom"){
      let endday = ""
      if(schedule[i].EndDay != null){
        endday = new Date(schedule[i].EndDay)
      }

      if(schedule[i].Minute != null){
        endday = new Date(schedule[i].StartDay)
        endday.setMinutes(endday.getMinutes()+schedule[i].Minute )
      }
      if (nowday == startdayday && nowyear==startdayyear && nowmon == startdaymon && nowhours ==startdayhours && nowminute==startdayminute){
        if(checkbom==false){
          button(maybom, true)
          buttoncheck(address+maybom,"may-bom" )
          checkbom=true
        }
      }
      if(endday!=""){
        enddayday = endday.getDate()
        enddayyear = endday.getFullYear()
        enddaymon = endday.getMonth()+1
        enddayhours = endday.getHours()+1
        enddayminute = endday.getMinutes()+1
        if (nowday == enddayday && nowyear==enddayyear && nowmon == enddaymon && nowhours ==enddayhours && nowminute==enddayminute){
          if(checkbom==true){
          button(maybom, false)
          buttoncheck(address+maybom,"may-bom" )
          checkbom=false
          }
        }
      }
      
      
    }
    else if(schedule[i].Type=="Quat"){

      
      let endday = ""
      if(schedule[i].EndDay != null){
        endday = new Date(schedule[i].EndDay)
      }

      if(schedule[i].Minute != null){
        endday = new Date(schedule[i].StartDay)
        endday.setMinutes(endday.getMinutes()+schedule[i].Minute )
      }
      if (nowday == startdayday && nowyear==startdayyear && nowmon == startdaymon && nowhours ==startdayhours && nowminute==startdayminute){
        if(checkquat==false){
          button(quat2, true)
          fanspeech(address+ quat2, 2)
          buttoncheck(address+quat2,"quat" )
          checkquat=true
        }
      }
      if(endday!=""){
        enddayday = endday.getDate()
        enddayyear = endday.getFullYear()
        enddaymon = endday.getMonth()+1
        enddayhours = endday.getHours()+1
        enddayminute = endday.getMinutes()+1
        if (nowday == enddayday && nowyear==enddayyear && nowmon == enddaymon && nowhours ==enddayhours && nowminute==enddayminute){
          if(checkquat==true){
            button(quat2, false)
            checkquat=false
            buttoncheck(address+quat2,"quat" )

          }
        }
      }
      
      
    }
    else if(schedule[i].Type=="DieuHoa"){
      
      
      let endday = ""
      if(schedule[i].EndDay != null){
        endday = new Date(schedule[i].EndDay)
      }

      if(schedule[i].Minute != null){
        endday = new Date(schedule[i].StartDay)
        endday.setMinutes(endday.getMinutes()+schedule[i].Minute )
      }
      if (nowday == startdayday && nowyear==startdayyear && nowmon == startdaymon && nowhours ==startdayhours && nowminute==startdayminute){
        if(checkbom == false && checkquat==false){
          button(quat2, true)
          button(maybom,true)
          fanspeech(address+ quat2, 2)
          buttoncheck(address+quat2,"quat" )
          buttoncheck(address+maybom,"may-bom" )
          checkbom=true
          checkquat=true
        }
      }
      if(endday!=""){
        enddayday = endday.getDate()
        enddayyear = endday.getFullYear()
        enddaymon = endday.getMonth()+1
        enddayhours = endday.getHours()+1
        enddayminute = endday.getMinutes()+1
        if (nowday == enddayday && nowyear==enddayyear && nowmon == enddaymon && nowhours ==enddayhours && nowminute==enddayminute){
          if(checkbom==true && checkquat==true){
            buttoncheck(address+quat2,"quat" )
            buttoncheck(address+maybom,"may-bom" )
          button(quat2, false)
          button(maybom,false)
          checkbom=false
          checkquat=false
          }
        }
      }
      
      
    }
  }
}
setInterval(function () {autocheck()}, 5000);

