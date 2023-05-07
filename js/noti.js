const TEMPERATURE_THRESHOLD = [15,35],
    SOIL_MOIST_THRESHOLD = [10,50],
    HUMIDITY_THRESHOLD = [10,50];
    LIGHT_THRESHOLD = [10,70];

var temperature,
    soilMoisture,
    humidity,
    light;

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
    spanTB.innerHTML= " ID thiết bị:" + msgArr[0] + "   " + msgArr[1];
    var span = document.createElement("span")
    span.className = "pull-right text-muted small"


    span.innerHTML = msgArr[2];

    a.appendChild(i)
    a.appendChild(spanTB)
    a.appendChild(span)
    
    div.appendChild(a)
    chill_List = list_Warn.children
    lenChillList = chill_List.length

    if(list_Warn.childElementCount > 5) {
        list_Warn.innerHTML = ''; // clear list
    }

    // let checkadd = true
    // for( i=0;i<length;i++){
    //     if(chill_List[i].className == 'wa'){
    //         checkadd = false
    //         break
    //     }
    // }
    // if(checkadd){
        list_Warn.appendChild(div)
    // }
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

    objectData = await getObjectDataFromServer('DataTemperature')
    // objectData = {ID_Temperature_senser:"8113132",Value:"13",Status:"Failed",End_time:"6-9-1969"}
    sendNotificationToScreen( generateMessagesFromObject(objectData, 'Temperature') );

    objectData = await getObjectDataFromServer('DataHumiditys')
    // objectData = {ID_Humidity_senser:"8091832",Value:"69",Status:"OK",End_time:"6-9-1996"}
    sendNotificationToScreen( generateMessagesFromObject(objectData, 'Humidity') );

    objectData = await getObjectDataFromServer('DataSoilmoistures');
    sendNotificationToScreen( generateMessagesFromObject(objectData, 'Soilmoisture') );

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
            "Cảnh Báo Ánh Sáng Dưới Ngưỡng" :
            (valueFromObj > LIGHT_THRESHOLD[1]) ?
            "Cảnh Báo Ánh Sáng Vượt Ngưỡng" : null;
        }

        return mainMsg;
    })();

    if(!mainMsg || !mainMsg.length) {
        return null;
    }
    

    let propID = "ID_" + objectString + "_senser"; // create string for read JSON "ID_Humidity_senser" for example
    // let propStatus = "Status";
    let propEndTime = "End_time";

    return objectData[propID] +"__"+ mainMsg +"__"+ objectData[propEndTime]
}

// obj1 = {ID_Humidity_senser:"8091832",Value:"69",Status:"OK",End_time:"6-9-1996"}
// obj2 = {ID_Temperature_senser:"8113132",Value:"13",Status:"Failed",End_time:"6-9-1969"}
// obj3 = {ID_Light_senser:"814141832",Value:"0",Status:"OK",End_time:"6-9-1966"}

// console.log(generateMessagesFromObject(obj1, 'Humidity'))
// console.log(generateMessagesFromObject(obj2, 'Temperature'))
// console.log(generateMessagesFromObject(obj3, 'Light'))

setTimeOut(2000,checkParamaterAndSendNoti);//2 giay cap nhat thong bao 1 lan