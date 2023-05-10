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

    lengthTable = Math.min(listLight.length,listHumidity.length,listSoilmoisture.length, listTemperature.length )

    var row = document.getElementById("bodytable")


    for(i=lengthTable;i>0;i--){
        var tr = document.createElement("tr")
        row.appendChild(tr)
        var tdTime = document.createElement("td")
        var tdDatalight = document.createElement("td")
        var tdDataHumidity = document.createElement("td")
        var tdDataSoilmoisture = document.createElement("td")
        var tdDataTemperature = document.createElement("td")
        var tdWarning = document.createElement("td")
        
        tr.appendChild(tdTime)
        tr.appendChild(tdDataSoilmoisture)
        tr.appendChild(tdDataHumidity)
        tr.appendChild(tdDatalight)
        tr.appendChild(tdDataTemperature)
        tr.appendChild(tdWarning)
        
        time = new Date(listLight[lengthListLight-i]['End_time'])
        tdTime.innerHTML =time.getDay() +"/"+ time.getMonth() + "/"+ time.getFullYear()+ "-" +time.getHours() +":"+ time.getMinutes()
        tdDatalight.innerHTML = listLight[lengthListLight-i].Value
        tdDataHumidity.innerHTML = listHumidity[lengthlistHumidity-i].Value
        tdDataSoilmoisture.innerHTML = listSoilmoisture[lengthlistSoilmoisture-i].Value
        tdDataTemperature.innerHTML = listTemperature[lengthlistTemperature-i].Value


    }
}
displayTableData()

