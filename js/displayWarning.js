minLight = 10
maxLight = 70

minHum = 10
maxHum = 50

minTem = 15
maxTem = 35

minSoi = 10
maxSoi = 50

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


    span.innerHTML = "vai phut truoc"

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
    if(listLight[lengthListLight-1].Value < minLight){
        addchill(listWarn, "", "duoi nguong", "Anh sang")
    }
    if(listLight[lengthListLight-1].Value > maxLight){
        addchill(listWarn, "", "vuot nguong", "Anh sang")
    }
    if(listHumidity[lengthlistHumidity-1].Value < minHum){
        addchill(listWarn, "", "duoi nguong", "Do am khong khi")
    }
    if(listHumidity[lengthlistHumidity-1].Value > maxHum){
        addchill(listWarn, "", "vuot nguong", "Do am khong khi")
    }
    if(listSoilmoisture[lengthlistSoilmoisture-1].Value < minSoi){
        addchill(listWarn, "", "duoi nguong", "Do am dat")
    }
    if(listSoilmoisture[lengthlistSoilmoisture-1].Value > maxSoi){
        addchill(listWarn, "", "vuot nguong", "Do am dat")
    }
    if(listTemperature[lengthlistTemperature-1].Value < minTem){
        addchill(listWarn, "", "duoi nguong", "Nhiet do")
    }
    if(listTemperature[lengthlistTemperature-1].Value > maxTem){
        addchill(listWarn, "", "vuot nguong", "Nhiet do")
    }

}
//setInterval(function () {displayWarn()}, 1000);
displayWarn()