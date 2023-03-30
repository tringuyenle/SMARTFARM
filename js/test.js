


async function getchart(){
    const ctx = document.getElementById('myChart');
    var text =await fetch("http://localhost:3000/Datalights")
    var listobj = await text.json()
    lengthListObj = listobj.length
    lengthobj = listobj[0].length
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
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: time,
        datasets: [
          {
          label: 'Light',
          data: value,
          borderWidth: 3
          },
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
}
getchart()