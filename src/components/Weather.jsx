import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import cloud_icon from "../assets/wind.png";
import drizzle_icon from "../assets/wind.png";
import rain_icon from "../assets/wind.png";
import snow_icon from "../assets/wind.png";
const Weather = () => {
  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const [weatherData, setweatherData] = useState(false);
  let inputRef = useRef()
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API
      }`;
      const res = await fetch(url);
      const data = await res.json();
      const icon = allIcon[data.weather[0].icon] || clear_icon;
      setweatherData({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        wind: data.wind.speed,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log("sorry! there is some mistake.");
    }
  };

  useEffect(() => {
    search("Pakistan");
  }, []);
  return (
    <div className="flex flex-col item-center shadow-2xl place-self-center p-12 rounded-lg bg-gradient-to-tr from-[#2f4680] to-[#500ae4]">
      <div className="search_bar flex items-center gap-4 ">
        <input
        ref={inputRef}
          type="text"
          placeholder="Search the country temp."
          className="h-12 border-none outline-none rounded-full bg-[#ebfffc] px-6 text-[#262626]"
        />
        <img
          src={search_icon}
          className="h-12 items-center p-3 cursor-pointer bg-[#ebfffc] rounded-full text-[#626262]"
          onClick={()=>search(inputRef.current.value)}
        />
      </div>
      <img src={weatherData.icon} className="m-auto p-8 h-52"/>
      <p className="items-center m-auto text-[75px] tracking-tighter text-white leading-9">
        {weatherData.temp}°C
      </p>
      <p className="items-center m-auto text-[35px] text-white pt-2">{weatherData.location}</p>
      <div className="weather_data flex justify-around py-8 text-white">
        <div className="col flex items-center mr-2">
          <img src={humidity_icon} className="h-8  mx-2 " />
          <div>
            <p className="text-[27px] leading-5">{weatherData.humidity}%</p>
            <span className="text-[14px]">Humidity</span>
          </div>
        </div>
        <div className="col flex items-center ml-2">
          <img src={wind_icon} className="h-9 mx-2" />
          <div>
            <p className="text-[27px] leading-5">{weatherData.wind}km/h</p>
            <span className="text-[14px]">Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
