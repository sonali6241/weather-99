// WeatherCard.js
import React from 'react';

const WeatherCard = ({ data }) => {
  // Extract data and display it
  return (
    <div>
      <h2>{data.date}</h2>
      <p>High: {data.highTemp}°C</p>
      <p>Low: {data.lowTemp}°C</p>
      <p>Coordinates: {data.coordinates}</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Sunrise: {data.sunrise}</p>
      <p>Sunset: {data.sunset}</p>
      <img src={data.weatherImage} alt={data.weatherCondition} />
    </div>
  );
};

export default WeatherCard;
