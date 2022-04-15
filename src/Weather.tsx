import React, { useEffect, useState } from "react";
import "./styles/weather-icons.min.css";

// refresh every five minutes.
const refreshInterval = 1000 * 60 * 5;

interface IntWeather {
  current: any;
  daily: any;
}

const Weather = () => {
  const [fetchedWeather, setFetchedWeather] = useState<IntWeather | null>(null);

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${process.env.REACT_APP_LATITUDE}&lon=${process.env.REACT_APP_LONGITUDE}&appid=${process.env.REACT_APP_API_KEY}&units=metric&exclude=hourly,alerts,minutely`
    );
    const data = await response.json();
    setFetchedWeather(data);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    const interval = setTimeout(fetchWeather, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchedWeather]);

  const getCurrentTemp = () => {
    return Math.round(fetchedWeather?.current.temp);
  };

  const getRounded = (number: number) => {
    return Math.round(number);
  };

  const getFormattedTime = (rawTime: number) => {
    const date = new Date(rawTime * 1000);
    const formattedDate = date.toLocaleTimeString([], {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
  };

  const getFormattedDay = (rawTime: number) => {
    const date = new Date(rawTime * 1000);

    return date.toLocaleDateString([], {
      weekday: "short",
    });
  };

  const generateForecastRow = (forecast: any) => {
    return (
      <div key={JSON.stringify(forecast)} className="w-full flex items-center">
        <span className="w-[30%] ">{getFormattedDay(forecast.dt)}</span>
        <i
          className={`w-[30%] text-5xl  wi wi-owm-${forecast.weather[0].id}`}
        />
        <span className="w-[20%] ">{getRounded(forecast.temp.max)}</span>
        <span className="w-[20%] font-thin">
          {getRounded(forecast.temp.min)}
        </span>
      </div>
    );
  };

  return (
    <div className=" flex flex-col">
      <div className="  flex justify-center items-center">
        <div>
          <i
            className={`wi wi-owm-${fetchedWeather?.current.weather[0].id} text-9xl`}
          />
        </div>
        <div className="ml-5 flex flex-col items-center">
          <span className="text-8xl">{getCurrentTemp()}°</span>
          <div className="flex">
            <span className="text-4xl m-4">
              {getRounded(fetchedWeather?.daily[0].temp.max)}°
            </span>
            <span className="text-4xl m-4 font-thin">
              {getRounded(fetchedWeather?.daily[0].temp.min)}°
            </span>
          </div>
        </div>
      </div>
      <span className=" text-5xl my-5">
        {fetchedWeather?.current.weather[0].description}
      </span>
      <div className=" text-3xl">
        <span>
          <i className="wi wi-sunrise"></i>
          <span>{getFormattedTime(fetchedWeather?.current.sunrise)}</span>
        </span>
        <span className="ml-5">
          <i className="wi wi-sunset"></i>
          <span>{getFormattedTime(fetchedWeather?.current.sunset)}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 grid-rows-4  text-4xl my-10 gap-4">
        {fetchedWeather?.daily
          .slice(1, 5)
          .map((forecast: any) => generateForecastRow(forecast))}
      </div>
    </div>
  );
};

export default Weather;
