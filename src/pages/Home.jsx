import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const images = [
  { src: '/assets/image1.JPG', title: 'Welcome to Nature' },
  { src: '/assets/image2.JPG', title: 'Explore the World' },
  { src: '/assets/image3.JPG', title: 'Adventure Awaits' }
];

const API_KEY = '89d6c114ec7bbbfd4be0ebc38e323833'; // OpenWeatherMap에서 발급받은 API 키 넣기
const CITY = 'ansan';

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5초마다 이미지 전환

    return () => clearInterval(timer);
  }, []);

    useEffect(() => {
    const fetchWeather = async () => {
      try {
        const city = 'ansan';
        const apiKey = '89d6c114ec7bbbfd4be0ebc38e323833'; // 👈 발급받은 키 넣기
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const res = await axios.get(url);
        setWeather({
          temp: Math.round(res.data.main.temp),
          icon: res.data.weather[0].icon,
          description: res.data.weather[0].main
        });
      } catch (err) {
        console.error('Weather API Error:', err);
      }
    };

    fetchWeather();
  }, []);

  return (
      <div className="home-container">
      {images.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img.src})` }}
        >
          <h1 className={`slide-title ${index === current ? 'title-show' : ''}`}>
            {img.title}
          </h1>
        </div>
      ))}

      {weather && (
        <div className="weather-widget">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
          <div>{weather.temp}℃</div>
          <div>{weather.description}</div>
        </div>
      )}
    </div>
  );
}
