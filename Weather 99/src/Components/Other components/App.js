// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';

const API_KEY = '595a16e54cf4a0aa9b2ef8173c3b84ed';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL, {
          params: {
            q: city || 'default-city',
            appid: API_KEY,
            units: 'metric',
          },
        });

        const processedData = processWeatherData(response.data);
        setWeatherData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [city]);

  const processWeatherData = (data) => {
    if (!data || !data.list || data.list.length === 0) {
      return [];
    }

    const processedData = data.list.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0];

      if (!acc[date]) {
        acc[date] = {
          date,
          highTemp: -Infinity,
          lowTemp: Infinity,
          coordinates: `${data.city.coord.lat}, ${data.city.coord.lon}`,
          humidity: 0,
          sunrise: '',
          sunset: '',
          weatherCondition: '',
        };
      }

      acc[date].highTemp = Math.max(acc[date].highTemp, item.main.temp_max);
      acc[date].lowTemp = Math.min(acc[date].lowTemp, item.main.temp_min);

      acc[date].humidity = item.main.humidity;
      acc[date].sunrise = data.city.sunrise;
      acc[date].sunset = data.city.sunset;
      acc[date].weatherCondition = item.weather[0].main;

      return acc;
    }, {});

    return Object.values(processedData);
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {weatherData.map((dayData, index) => (
        <WeatherCard key={index} data={dayData} />
      ))}
    </div>
  );
};

export default App;
