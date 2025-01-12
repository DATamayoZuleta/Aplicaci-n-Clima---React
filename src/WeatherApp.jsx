import React, { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'API KEY'
    const difKelvin = 273.15 //Para lograr obtener grados celsious se deb restar este numero a los grados Kelvin

    const fetchWeatherData = async() => {
        try{
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            setWeatherData(data)
        } catch(error) {
            console.error('Ha habido un error: ', error)
        }
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData()
    }
    return (

        <div className='container'>
            <h1>Aplicacion de clima</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder='Ingresa una ciudad' 
                value={city}
                onChange={handleCityChange}
                />
                <button type='submit'>Buscar</button>
            </form>

            {weatherData && (
                <div> 
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La temperatura actual es {Math.floor(weatherData.main.temp - difKelvin)}°C</p>
                    <p>La condicion meteorológica actual: {weatherData.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                </div>
            )}
        </div>

    )
}
