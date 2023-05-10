var TEMPERATURE_THRESHOLD = [15,35],
    SOIL_MOIST_THRESHOLD = [10,50],
    HUMIDITY_THRESHOLD = [10,50];
    LIGHT_THRESHOLD = [10,70];

var temperature,
    soilMoisture,
    humidity,
    light;

var popuppanel = document.getElementById('pop-up-panel');

function togglePopUpPanel() {
    if(popuppanel.style.visibility === 'hidden') {
        displayCurrentThreshold();
        popuppanel.style.visibility = 'visible';
    }
    else { popuppanel.style.visibility = 'hidden'; }
}
function displayCurrentThreshold() {
    let arrFil = [...document.getElementsByClassName('fil')];

    arrFil[0].value = TEMPERATURE_THRESHOLD[0]; arrFil[1].value = TEMPERATURE_THRESHOLD[1];
    arrFil[2].value = LIGHT_THRESHOLD[0]; arrFil[3].value = LIGHT_THRESHOLD[1];
    arrFil[4].value = HUMIDITY_THRESHOLD[0]; arrFil[5].value = SOIL_MOIST_THRESHOLD[1];
    arrFil[6].value = SOIL_MOIST_THRESHOLD[0]; arrFil[7].value = SOIL_MOIST_THRESHOLD[1];
}
function updateThreshold() {
    let arrFil = [...document.getElementsByClassName('fil')];

    let allFilValueOK = true;

    arrFil.forEach(ele => {
        if(!ele || !ele.value || !ele.value.length
            || ele.value.length > 3 || parseInt(ele) <= 0 || parseInt(ele) > 150) {
            allFilValueOK = false;
        }
    });

    if(!allFilValueOK) {
        triggerMsg('Hãy Đảm Bảo Nhập Giá Trị Hợp Lệ!','red');
        return;
    }

    TEMPERATURE_THRESHOLD[0] = arrFil[0].value; TEMPERATURE_THRESHOLD[1] = arrFil[1].value;
    LIGHT_THRESHOLD[0] = arrFil[2].value; LIGHT_THRESHOLD[1] = arrFil[3].value;
    HUMIDITY_THRESHOLD[0] = arrFil[4].value; SOIL_MOIST_THRESHOLD[1] = arrFil[5].value;
    SOIL_MOIST_THRESHOLD[0] = arrFil[6].value; SOIL_MOIST_THRESHOLD[1] = arrFil[7].value;

    triggerMsg('Ghi Thành Công! Bạn Có Thể Đóng Của Sổ Này!','green');
}
function triggerMsg(msg, color) {
    let commandresult = document.getElementById('command-result');
    commandresult.style.color = color;
    commandresult.innerText = msg;

    setTimeout(() => { document.getElementById('command-result').innerText = ''; },2000);
}

function beautifyStringDate(uglyDate) {
    let arr = uglyDate.slice(0,uglyDate.length-4).split('T');
    return arr[1] + " " + arr[0];
}

function sendNotificationToScreen(mainMsg){
    if(!mainMsg || !mainMsg.length) {
        return;
    }

    let msgArr = mainMsg.split('__');
    let list_Warn = document.getElementById("list_Warn");

    var div = document.createElement("div")
    div.className = "warning"
    var a = document.createElement("a")
    a.className = "list-group-item"
    var i = document.createElement("i")
    i.className="fa fa-warning fa-fw"
    
    var spanTB = document.createElement("span")
    spanTB.innerHTML= " ID:" + msgArr[0] + "   " + msgArr[1];
    var span = document.createElement("span")
    span.className = "pull-right text-muted small"


    span.innerHTML = msgArr[2];

    a.appendChild(i)
    a.appendChild(spanTB)
    a.appendChild(span)
    
    div.appendChild(a)
    chill_List = list_Warn.children
    lenChillList = chill_List.length

    if(list_Warn.childElementCount > 4) {
        list_Warn.removeChild(list_Warn.lastElementChild); // clear list
    }

    if(list_Warn.childElementCount === 0) {
        list_Warn.appendChild(div);
    }
    else { list_Warn.insertBefore(div,list_Warn.firstElementChild); }
}

async function getObjectDataFromServer(endpoint) {
    let url = 'http://localhost:3000/' + endpoint;

    let responseArr = await (await fetch(url)).json();
    if(!responseArr || !responseArr.length) {
        return null;
    }

    return responseArr.slice(-1).pop();
}

async function checkParamaterAndSendNoti() {
    let objectData = null;

    objectData = await getObjectDataFromServer('DataTemperatures')
    // objectData = {ID_Temperature_senser:"8113132",Value:"13",Status:"Failed",End_time:"6-9-1969"}
    sendNotificationToScreen( generateMessagesFromObject(objectData, 'Temperature') );

    objectData = await getObjectDataFromServer('DataHumiditys')
    // objectData = {ID_Humidity_senser:"8091832",Value:"69",Status:"OK",End_time:"6-9-1996"}
    sendNotificationToScreen( generateMessagesFromObject(objectData, 'Humidity') );

    // objectData = await getObjectDataFromServer('DataSoilmoistures');
    // sendNotificationToScreen( generateMessagesFromObject(objectData, 'Soilmoisture') );

    objectData = await getObjectDataFromServer('Datalights');
    // objectData = {ID_Light_senser:"814141832",Value:"0",Status:"OK",End_time:"6-9-1966"}
    sendNotificationToScreen( generateMessagesFromObject(objectData, 'Light') );
}


function generateMessagesFromObject(objectData, objectString) {
    if(!objectData || typeof objectData !== 'object'
        || typeof objectString !== 'string' ) {
            return "Lỗi đọc dữ liệu từ máy chủ, kiếm tra lại hệ thống!!";
        }

    const mainMsg = (function generateMessagesFromValue() {
        const valueFromObj = parseInt(objectData['Value']);
        
        if(valueFromObj !== valueFromObj) { // check NaN
            return "Lỗi đọc dữ liệu từ máy chủ, kiếm tra lại hệ thống!!";
        }

        let mainMsg
        if(objectString === 'Temperature') {
            mainMsg = (valueFromObj < TEMPERATURE_THRESHOLD[0]) ?
            "Cảnh Báo Nhiệt Độ Dưới Ngưỡng" :
            (valueFromObj > TEMPERATURE_THRESHOLD[1]) ?
            "Cảnh Báo Nhiệt Độ Vượt Ngưỡng" : null;
        }
        else if(objectString === 'Humidity') {
            mainMsg = (valueFromObj < HUMIDITY_THRESHOLD[0]) ?
            "Cảnh Báo Độ Ẩm Dưới Ngưỡng" :
            (valueFromObj > HUMIDITY_THRESHOLD[1]) ?
            "Cảnh Báo Độ Ẩm Vượt Ngưỡng" : null;
        }
        else if(objectString === 'Soilmoisture') {
            mainMsg = (valueFromObj < SOIL_MOIST_THRESHOLD[0]) ?
            "Cảnh Báo Độ Ẩm Đất Dưới Ngưỡng":
            (valueFromObj > SOIL_MOIST_THRESHOLD[1]) ?
            "Cảnh Báo Độ Ẩm Đất Vượt Ngưỡng" : null;
        }
        else if(objectString === 'Light') {
            mainMsg = (valueFromObj < LIGHT_THRESHOLD[0]) ?
            "Cảnh Báo Độ Sáng Dưới Ngưỡng" :
            (valueFromObj > LIGHT_THRESHOLD[1]) ?
            "Cảnh Báo Độ Sáng Vượt Ngưỡng" : null;
        }

        return mainMsg;
    })();

    if(!mainMsg || !mainMsg.length) {
        return null;
    }
    

    let propID = "ID_" + objectString + "_senser"; // create string for read JSON "ID_Humidity_senser" for example
    // let propStatus = "Status";
    let propEndTime = "End_time";

    return objectData[propID] +"__"+ mainMsg +"__"+ beautifyStringDate ( objectData[propEndTime] )
}

var repeatTask = window.setInterval(checkParamaterAndSendNoti,2000);//2 giay cap nhat thong bao 1 lan
var intervalSet = true;
var togWarnBut = document.getElementById('toggle-warn');

togWarnBut.addEventListener('click', () => {
    if(!window.intervalSet) {
        window.repeatTask = window.setInterval(checkParamaterAndSendNoti,2000);//2 giay cap nhat thong bao 1 lan
        window.intervalSet = true;
        togWarnBut.innerText = 'Tắt Thông Báo';
    }
    else {
        window.clearInterval(window.repeatTask);
        window.intervalSet = false;
        togWarnBut.innerText = 'Bật Thông Báo';
    }
});