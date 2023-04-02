const warnHightLight = 70
const warnLowLight = 10
const warnHightHumidity = 40
const warnLowHumidity = 20
const warnHightSoilmoisture = 40
const warnLowSoilmoisture = 20
const warnHightTemperature = 40
const warnLowTemperature = 20


function warning(childClassWarning){
        var att = document.createAttribute("class")
        att.value = "alert alert-danger"
        childClassWarning.setAttributeNode(att)
        childClassWarning.innerHTML = "Warning: Hight Light"

        var att1 = document.createAttribute("class")
        att1.value = "alert alert-warning"
        childClassWarning.setAttributeNode(att)
}


async function displayTableData(){
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

    var getClassWarning = document.getElementsByClassName("displayWarning")
    
    for(i=0;i<getClassWarning.length;i++){
        var childClassWarning = getClassWarning[i].children
        if(i==0){
            if(listLight[lengthListLight-1]['Value'] > warnHightLight){
                var att = document.createAttribute("class")
                att.value = "alert alert-danger"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "Warning: Hight Light"
            }
            else if(listLight[lengthListLight-1]['Value'] < warnLowLight){
                var att = document.createAttribute("class")
                att.value = "alert alert-danger"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "Warning: Low Light"
            }
            else{
                var att = document.createAttribute("class")
                att.value = "alert alert-success"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "OK"
            }
        }
        if(i==1){
            if(listSoilmoisture[lengthlistSoilmoisture-1]['Value'] > warnHightSoilmoisture){
                var att = document.createAttribute("class")
                att.value = "alert alert-danger"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "Warning: Hight Soilmoisture"
                
            }
            else if(listSoilmoisture[lengthlistSoilmoisture-1]['Value'] < warnLowSoilmoisture){
                var att = document.createAttribute("class")
                att.value = "alert alert-danger"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "Warning: Low Soilmoisture"
            }
            else{
                var att = document.createAttribute("class")
                att.value = "alert alert-success"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "OK"
            }
        }
        if(i==2){
            if(listHumidity[lengthlistHumidity-1]['Value'] > warnHightHumidity){
                var att = document.createAttribute("class")
                att.value = "alert alert-danger"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "Warning: Hight Humidity"
            }
            else if(listHumidity[lengthlistHumidity-1]['Value'] < warnLowHumidity){
                var att = document.createAttribute("class")
                att.value = "alert alert-danger"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "Warning: Low Humidity"
            }
            else{
                var att = document.createAttribute("class")
                att.value = "alert alert-success"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "OK"
            }
        }
        if(i==3){
            if(listTemperature[lengthlistTemperature-1]['Value'] > warnHightTemperature){
                var att = document.createAttribute("class")
                att.value = "alert alert-danger"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "Warning: Hight Temperature"
            }
            else if(listTemperature[lengthlistTemperature-1]['Value'] < warnLowTemperature){
                var att = document.createAttribute("class")
                att.value = "alert alert-danger"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "Warning: Low Temperature"
            }
            else{
                var att = document.createAttribute("class")
                att.value = "alert alert-success"
                childClassWarning[0].setAttributeNode(att)
                childClassWarning[0].innerHTML = "OK"
            }
        }
    }
    
}
setInterval(function () {displayTableData()}, 1000);
