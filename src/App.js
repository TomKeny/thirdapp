import './App.css';
import { useEffect, useState } from 'react';
import {Movies} from "./Movies"
import { Unmount } from './Unmount';


function App() {
  const [weather, setWeather] = useState({latitude: null,
  hourly_units: {temperature_2m: null}})
  const [error, setError] = useState(null)
  const [toggle,setToggle] = useState(true)

  function changeToggle () {
    toggle ? setToggle(false): setToggle(true)
  }

  useEffect(function () {
    async function fetchWeather() {
      try {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=53.4098&longitude=-2.1576&hourly=temperature_2m,weather_code&timezone=GMT';
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json()
        setWeather(data)
        
      } catch (err) {
        setError("could not fetch data")
        console.log(err.message)
      }
    }
    fetchWeather()
  }, [])

  return (
    <div className="App">
      <p>{weather.latitude}</p>
      <p>{weather.hourly_units.temperature_2m}</p>
    </div>
  );
}

export default App;
