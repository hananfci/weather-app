// Setup empty JS object to act as endpoint for all routes
appData = {};
 // Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
// Start up an instance of app
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 3000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

const data = []


  app.get('/all', allData)

  function allData( req,res){
      res.send(data)

  }



 app.post('/addweatherinfo', addweatherinfo )

function addweatherinfo(req,res){

  newWeather = {
    date: req.body.date,
    temp : req.body.temp,
    content : req.body.content
  }

  data.push(newWeather)
  res.send(data)
  console.log(newWeather)
}
