
const ctx = document.getElementById('myChart');
var a = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
      label: 'Light',
      data: [],
      borderWidth: 3
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
function addData(chart, label, data) {
  chart.data.labels=label;
  chart.data.datasets.forEach((dataset) => {
      dataset.data=data;
  });
  chart.update();
}
async function getchart(){

    var text =await fetch("http://localhost:3000/Datalights")
    var listobj = await text.json()
    lengthListObj = listobj.length
    lengthobj = listobj[0].length
    // fetch('http://localhost:3000/Datalights')
    //  .then(response => alert(response.json()[1]))
    time =[]
    for(i=lengthListObj-10;i<lengthListObj;i++){
      var timeof = new Date(listobj[i]['End_time'])
      var hoursAndmin = timeof.getHours()+":"+timeof.getMinutes() + ":" +timeof.getSeconds()
      time.push(hoursAndmin)
    }

    value = []
    for(i=lengthListObj-10;i<lengthListObj;i++){
      value.push(listobj[i]['Value'])
    }
    addData(a,time,value)
}
setInterval(function () {getchart()}, 1000);
//getchart();
