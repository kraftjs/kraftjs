import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Weather } from './weather';
import WeatherInfo from './weather-info';

const has = (value: any): value is boolean => !!value;

const APPID = process.env.REACT_APP_APPID;
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const suffix = `&units=imperial&appid=${APPID}`;

const App: React.FC = () => {
    const [city, setCity] = useState('London');
    const [msgFromChild, setMsgFromChild] = useState('');
    const [weather, setWeather] = useState<Weather | null>(null);

    useEffect(() => {
        getWeather(city);
    }, []);

    async function getWeather(location: string) {
        const response = await fetch(baseUrl + location + suffix);
        if (response.status === 200) {
            const jsonWeather = await response.json();
            const cityTemp: Weather = jsonWeather.main;
            cityTemp.city = jsonWeather.name;
            setWeather(cityTemp);
        } else {
            setWeather(null);
        }
    }

    const getMsgFromChild = (msg: string) => setMsgFromChild(msg);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        getWeather(city);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter city' onChange={handleChange} />
                <button type='submit'>Get weather</button>
                {msgFromChild}
                {has(weather) ? (
                    <WeatherInfo weather={weather} parentChannel={getMsgFromChild}>
                        <strong>Hello from the parent!</strong>
                    </WeatherInfo>
                ) : (
                    <h2>No weather available</h2>
                )}
            </form>
        </div>
    );
};

export default App;
