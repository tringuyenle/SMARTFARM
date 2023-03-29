// const fetch = require('node-fetch')
// const express = require('express');
// const Datalight = require("../model/Datalight")
var express = require("express")
var app = express()
var mongoose =require("mongoose")
var bodyparser = require("body-parser")
var Request = require('request');
var fetch = require('node-fetch')
var DataSoilmoisturetRoute = require("../routes/DataSoilmoistures")
var DatalightRoute = require("../routes/Datalights")
var DataTemperutareRoute = require("../routes/DataTemperatures")
var DataHumidityRoute = require("../routes/DataHumiditys")

import Chart from 'chart.js/auto'


// const router = express.Router();

function chart1() {
  // const ketnoi = mongoose.connect("mongodb+srv://ducvietha82:ducvietha82@cluster0.2t7itdx.mongodb.net/?retryWrites=true&w=majority")
  //       console.log("Da ket noi")

  // const myDatalight = fetch("https://io.adafruit.com/api/v2/tringuyennek/feeds/anh-sang")
  // const res = myDatalight.json()
  const data = [
     {time: 1, value: 1 },
     {time: 2, value: 2 },
  ];

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: data.map(row => row.time),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.value)
          }
        ]
      }
    }
  );
};

chart1()
