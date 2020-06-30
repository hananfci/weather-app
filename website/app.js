
// Base URL and API Key for OpenWeatherMap API

let baseURL= 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=29ea0317bb4ce46cf4c77e178208986d&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  e.preventDefault();
  const zipcode= document.getElementById('zip').value;
const content= document.getElementById('feelings').value;

if (zipcode.length === 0 || content.length === 0) {
  alert("Please enter zip code and your feelings!");
  return
}

getweatherinfo(baseURL, zipcode, apiKey)

.then(function (dataFetch) {
postData('/addweatherinfo', { date: newDate, temp: dataFetch.main.temp, content:content })

.then(
  updateUI()
)
})

}
const getweatherinfo = async (baseURL, zipcode, apiKey)=>{

  const res = await fetch(baseURL+ zipcode + apiKey)
  try {

    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

 const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;

  }catch(error){
    console.log("error", error);
  }
} 



const postData = async ( url = '', data = {})=>{
      console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
     body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
    });

      try {
        const newWeatherData = await response.json();
        console.log(newWeatherData);
        return newWeatherData;
      }catch(error) {
      console.log("error", error);
      }
  }

