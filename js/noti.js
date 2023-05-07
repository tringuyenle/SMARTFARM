const TEMPERATURE_THRESHOLD = 35,
    SOIL_MOIST_THRESHOLD = 35,
    HUMIDITY_THRESHOLD = 35;
    LIGHT_THRESHOLD = 35;

var temperature,
    soilMoisture,
    humidity,
    light;

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
    sendNotificationToScreen( generateMessagesFromObject(objectData, 'Temperature') );

    objectData = await getObjectDataFromServer('DataHumiditys')
    sendNotificationToScreen( generateMessagesFromObject(objectData, 'Humidity') );

    objectData = await getObjectDataFromServer('DataSoilmoistures');
    sendNotificationToScreen( generateMessagesFromObject(objectData, 'Soilmoisture') );

    objectData = await getObjectDataFromServer('Datalights');
    sendNotificationToScreen( generateMessagesFromObject(objectData, 'Light') );
}

function generateMessagesFromObject(objectData, objectString) {
    if(!objectData || typeof objectData !== 'object'
        || typeof objectString !== 'string' ) {
            return "Lỗi đọc dữ liệu từ máy chủ, kiếm tra lại hệ thống!!";
        }

    let propID = "ID_" + objectString + "_senser"; // create string for read JSON "ID_Humidity_senser" for example
    let propStatus = "Status";
    let propEndTime = "End_time";

    return objectData[propID] + objectData[propStatus] + objectData[propEndTime]
}

function sendNotificationToScreen(message) {
    if(!message || !message.length) { return; }

    const part1 = '<a href="#" class="list-group-item"><i class="fa fa-warning fa-fw"></i> ';
    const part2 = '<span class="pull-right text-muted small"><em>';
    const part3 = '</em></span></a>';

    let notificationHTML = part1 + part2 + message + part3;

    let notificationPanel = document.getElementById('noti-panel');

    notificationPanel.innerHTML += notificationHTML;
}


Nhiệt độ vượt ngưỡng
4 minutes ago