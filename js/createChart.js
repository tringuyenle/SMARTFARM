var CountinChart = 30

const ctx = document.getElementById('myChart');
var a = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Light',
        data: [],
        borderWidth: 3,
        borderColor: '#0000FF',
        tension: 0.4
      },
      {
        label: 'Soilmoisture',
        data: [],
        borderWidth: 3,
        borderColor: '#00FF00',
        tension: 0.4
      },
      {
        label: 'Humidity',
        data: [],
        borderWidth: 3,
        borderColor: '#FFFF00',
        tension: 0.4
      },
      {
        label: 'Temperature',
        data: [],
        borderWidth: 3,
        borderColor: '#FF0000',
        tension: 0.4
      }
  ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
function addData(chart, label, valueLight,valueHumidity,valueSoilmoisture,valueTemperature ) {

  chart.data.labels=label;
  chart.data.datasets[0].data = valueLight
  chart.data.datasets[1].data = valueHumidity
  chart.data.datasets[2].data = valueSoilmoisture
  chart.data.datasets[3].data = valueTemperature
  chart.update();
}

function getdataFromDB(data){
  res = []
  var length = data.length
  for(i=length-CountinChart;i<length;i++){
    res.push(data[i]['Value'])
  }
  return res
}
async function getchart(){

    var Datalight =await fetch("http://localhost:3000/Datalights")
    var DataHumidity = await fetch("http://localhost:3000/DataHumiditys")
    var DataSoilmoisture = await fetch("http://localhost:3000/DataSoilmoistures")
    var DataTemperature = await fetch("http://localhost:3000/DataTemperatures")

    var listLight = await Datalight.json()
    var listHumidity = await DataHumidity.json()
    var listSoilmoisture = await DataSoilmoisture.json()
    var listTemperature = await DataTemperature.json()
    lengthListLight = listLight.length
    lengthLight = listLight[0].length
    // fetch('http://localhost:3000/Datalights')
    //  .then(response => alert(response.json()[1]))
    time =[]
    for(i=lengthListLight-CountinChart;i<lengthListLight;i++){
      var timeof = new Date(listLight[i]['End_time'])
      var hoursAndmin = timeof.getHours()+":"+timeof.getMinutes() + ":" +timeof.getSeconds()
      time.push(hoursAndmin)
    }

    valueLight = getdataFromDB(listLight)
    valueHumidity = getdataFromDB(listHumidity)
    valueSoilmoisture = getdataFromDB(listSoilmoisture)
    valueTemperature = getdataFromDB(listTemperature)
    
    addData(a,time,valueLight,valueHumidity,valueSoilmoisture,valueTemperature)
}
setInterval(function () {getchart()}, 1000);
//getchart();
