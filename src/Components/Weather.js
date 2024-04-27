import React, { useState } from 'react'
import './Weather.css'
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from'react-icons/md';
import { WiHumidity } from 'react-icons/wi'

const Weather = () => {

    const [city, setCity] = useState('');
    const [weather, setweather] = useState('');
    const [error, setError] = useState('');



    const API_KEY = "5acc1683650652bab831ecf7d57fd397";
    // const API_KEY = "74e3f4ac1ed2a986212bc7fa3ee09e22";
    // const API_KEY = "ac65a6c2eca5dd23204f692d004c8c12";
    // const API_KEY = "f108f4adb253faa49fe23d5f3cbdf504";



    // const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},{state code},{country code}&limit={limit}&appid=${API_KEY}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    function handleOnChange(event) {
        setCity(event.target.value);
        // console.log(event.target.value);
    }


    async function fetchData() {
        try {
            let response = await fetch(url);
            let output = await response.json();
            if(response.ok) {
                setweather(output);
                console.log(output);
                setError('');
            }
        }
        catch (error) {
            setError('No data found. Please enter a valid city name')
        }
    }






  return (
    <div className='container'>
        <div className='city'>

            <input type='text' value={city} onChange={handleOnChange} placeholder='Enter any city name'></input>
            <button onClick={() => fetchData()}>
                <FaSearch />
            </button>
        </div>

        {
            error && <p className='error-message'>{error}</p>
        }

        {
            weather && weather.weather && 
            <div className='content'>
                <div className='weather-image'>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=''></img>
                    <h3 className='desc'>{weather.weather[0].description} </h3>
                </div>


                <div className='weather-temp'>
                    <h2>{weather.main.temp}<span>&deg;C</span></h2>
                </div>

                <div className='weather-city'>
                    <div className='location'>
                        <MdLocationOn></MdLocationOn>
                    </div>
                    <p>{weather.name},<span>{weather.sys.country}</span></p>
                </div>

                <div className='weather-stats'>
                    <div className='wind'>
                        <div className='wind-icons'>
                            <FaWind></FaWind>
                        </div>
                        <h3 className='wind-speed'>{weather.wind.speed}<span>Km/h</span></h3>
                        <h3 className='wind-heading'>Wind Speed </h3>
                    </div>

                    <div className='humidity'>
                        <div className='hummidity-icon'>
                            <WiHumidity></WiHumidity>
                        </div>
                        <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
                        <h3 className='humidity-heading'>Humidity</h3>
                    </div>
                </div>

            </div>  
        }
    </div>
  )
}

export default Weather
