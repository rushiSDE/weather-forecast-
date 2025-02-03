// import logo from './logo.svg';
import { useEffect,useState } from 'react';
import './App.css';
import moment from 'moment';

function App() {

const [weatherdata , setweatherdata]= useState(false);
const [iconUrl, setIconUrl] = useState("");
const [city, setCity] = useState("");
    const search= async (india)=>{

      
        try{debugger
            const url =`http://api.weatherapi.com/v1/forecast.json?key="paste your api key here"&q=${city}&days=3`;

            const response = await fetch(url);
            const data = await response.json();
       
            console.log("data",data);
            setweatherdata({
                name: data.location.name,
                temp_c :data.forecast.forecastday[0].day.maxtemp_c,
                condition :data.forecast.forecastday[0].day.condition.text,
                localtime:moment(data.forecast.forecastday[0].date).format('MMMM Do, YYYY'),     
                        //   
                        localtime2:moment(data.forecast.forecastday[1].date).format('MMMM Do, YYYY'),
                        day2:data.forecast.forecastday[1].day.condition.text,
                        temp_c2:data.forecast.forecastday[1].day.maxtemp_c,
                    //
                   
                    localtime3:moment(data.forecast.forecastday[2].date).format('MMMM Do, YYYY'),
                    day3:data.forecast.forecastday[2].day.condition.text,
                    temp_c3:data.forecast.forecastday[2].day.maxtemp_c,


                 
            })
            if (data.forecast.forecastday[0].day.condition.text === "Mist") {
                setIconUrl("https://cdn.jim-nielsen.com/ios/512/weather-2021-12-07.png?rf=1024");
              } 
              else if(data.forecast.forecastday[0].day.condition.text === "Sunny") {
                setIconUrl("https://cdn.jim-nielsen.com/ios/512/today-weather-2015-08-20.png?rf=1024");
              }
              else if(data.forecast.forecastday[0].day.condition.text === "Patchy rain nearby") {
                setIconUrl("https://cdn.jim-nielsen.com/ios/512/weather-2019-02-07.png?rf=1024");
              }
        }
        catch (error) {

        }
      

      
    }
    const handleCityChange = (e) => {
        setCity(e.target.value);
      };
    
      // Handle form submission
      const handleSearch = (e) => {
        e.preventDefault();
        search(city); // Call search with the entered city
      };

    useEffect(()=>{

        search("india");
        
    },[])
  return (
    <div className="App">
   

  


    <div className="container">
{/*  */}
<div class="search-local">
		<div class="icon">
			<ion-icon name="location-outline"></ion-icon>
		</div>
	
		<input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter City Name"
          />
		<button onClick={handleSearch}>
			<a href="#">Serach</a>
			<ion-icon name="search-outline" class="search-icon"></ion-icon>
		</button>
	</div>
	&nbsp;
	{/* <!-- icons --> */}
	<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
	<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
{/*  */}
        <div className="weather">
            <h1 className="header">{weatherdata.name}</h1>
            <div className="cards">
                <div className="card">
                    <div className="city">{weatherdata.localtime}</div>
                    <div className="sunny">
                        {iconUrl && <img src={iconUrl} alt="Weather Icon" />}
                    </div>
                    <div className="temp">
                        <span className="deg">{weatherdata.temp_c}&deg;</span>
                        <span>{weatherdata.condition}</span>
                    </div>
                </div>

                <div className="card">
                    <div className="city">{weatherdata.localtime2}</div>
                    <div className="cloudy">
                        {iconUrl && <img src={iconUrl} alt="Weather Icon" />}
                    </div>
                    <div className="temp">
                        <span className="deg">{weatherdata.temp_c2}&deg;</span>
                        <span>{weatherdata.day2}</span>
                    </div>
                </div>

                <div className="card">
                    <div className="city">{weatherdata.localtime3}</div>
                    <div className="rainy">
                    {iconUrl && <img src={iconUrl} alt="Weather Icon" />}
                    </div>
                    <div className="temp">
                        <span className="deg">{weatherdata.temp_c3}&deg;</span>
                        <span>{weatherdata.day3}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>


    </div>
  );
}

export default App;
