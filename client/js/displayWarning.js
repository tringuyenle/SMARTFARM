minLight = 10
maxLight = 100

minHum = 10
maxHum = 80

minTem = 15
maxTem = 40

minSoi = 10
maxSoi = 100

function addchill(list_Warn, thoigian, minOrmax, type){
    var name = type + " " + minOrmax
    var div = document.createElement("div")
    div.className = type + " " + minOrmax
    var a = document.createElement("a")
    a.className = "list-group-item"
    var i = document.createElement("i")
    i.className="fa fa-warning fa-fw"
    
    var spanTB = document.createElement("span")
    spanTB.innerHTML= type + " " + minOrmax
    var span = document.createElement("span")
    span.className = "pull-right text-muted small"

    const timeInMs = new Date(thoigian).getTime();

// Get the current time in milliseconds
    const nowInMs = new Date().getTime();

    // Calculate the difference in milliseconds
    const diffInMs = nowInMs - timeInMs;

    // Convert milliseconds to days, hours, and minutes
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    timewarn =""
    if(diffInDays>0){
        timewarn+=diffInDays.toString()+" "+ "ngày "+diffInHours.toString()+" giờ " +  diffInMinutes.toString() + " phút trước"
        
    }
    else if(diffInHours>0){
        timewarn+=diffInHours.toString()+" giờ " +  diffInMinutes.toString() + " phút trước"
    }
    else{
        timewarn+=diffInMinutes.toString()+" phút trước"
    }

        

    span.innerHTML = timewarn

    a.appendChild(i)
    a.appendChild(spanTB)
    a.appendChild(span)
    
    div.appendChild(a)
    chill_List = list_Warn.children
    lenChillList = chill_List.length

    let checkadd = true
    for( i=0;i<length;i++){
        if(chill_List[i].className ==(type + " " + minOrmax) ){
            checkadd = false
            break
        }
    }
    if(checkadd){
        list_Warn.appendChild(div)
    }
}
async function displayWarn(){
    var Datalight =await fetch("http://localhost:3000/Datalights")
    var DataHumidity = await fetch("http://localhost:3000/DataHumiditys")
    var DataSoilmoisture = await fetch("http://localhost:3000/DataSoilmoistures")
    var DataTemperature = await fetch("http://localhost:3000/DataTemperatures")

    var listLight = await Datalight.json()
    var listHumidity = await DataHumidity.json()
    var listSoilmoisture = await DataSoilmoisture.json()
    var listTemperature = await DataTemperature.json()

    var lengthListLight = listLight.length
    var lengthlistHumidity = listHumidity.length
    var lengthlistSoilmoisture = listSoilmoisture.length
    var lengthlistTemperature = listTemperature.length

    listWarn = document.getElementById("list_Warn")
    lengthchill = list_Warn.childElementCount
    for(i=0;i<lengthchill;i++){
        listWarn.removeChild(listWarn.lastChild)
    }
    if(listLight[lengthListLight-1].Value <= minLight){
        addchill(listWarn, listLight[lengthListLight-1].End_time, "dưới ngưỡng", "Ánh sáng")
    }
    if(listLight[lengthListLight-1].Value >= maxLight){
        addchill(listWarn, listLight[lengthListLight-1].End_time, "vượt ngưỡng", "Ánh sáng")
    }
    if(listHumidity[lengthlistHumidity-1].Value <= minHum){
        addchill(listWarn, listHumidity[lengthlistHumidity-1].End_time, "dưới ngưỡng", "Độ ẩm không khí")
    }
    if(listHumidity[lengthlistHumidity-1].Value >= maxHum){
        addchill(listWarn, listHumidity[lengthlistHumidity-1].End_time, "vượt ngưỡng", "Độ ẩm không khí")
    }
    if(listSoilmoisture[lengthlistSoilmoisture-1].Value <= minSoi){
        addchill(listWarn, listSoilmoisture[lengthlistSoilmoisture-1].End_time, "dưới ngưỡng", "Độ ẩm đất")
    }
    if(listSoilmoisture[lengthlistSoilmoisture-1].Value >= maxSoi){
        addchill(listWarn, listSoilmoisture[lengthlistSoilmoisture-1].End_time, "vượt ngưỡng", "Độ ẩm đất")
    }
    if(listTemperature[lengthlistTemperature-1].Value <= minTem){
        addchill(listWarn,listTemperature[lengthlistTemperature-1].End_time, "dưới ngưỡng", "Nhiệt độ")
    }
    if(listTemperature[lengthlistTemperature-1].Value >= maxTem){
        addchill(listWarn, listTemperature[lengthlistTemperature-1].End_time, "vượt ngưỡng", "Nhiệt độ")
    }


}
//setInterval(function () {displayWarn()}, 1000);
displayWarn()