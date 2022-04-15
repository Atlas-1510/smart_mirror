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

    console.log(data);
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

  const getDayHigh = () => {
    return Math.round(fetchedWeather?.daily[0].temp.max);
  };

  const getDayLow = () => {
    return Math.round(fetchedWeather?.daily[0].temp.min);
  };

  const getFormattedTime = (rawTime: number) => {
    const date = new Date(rawTime * 1000);
    console.log(date);
    const formattedDate = date.toLocaleTimeString([], {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
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
            <span className="text-4xl m-4">{getDayHigh()}°</span>
            <span className="text-4xl m-4 font-thin">{getDayLow()}°</span>
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

      <div className="grid grid-cols-1 grid-rows-4 bg-green-300 text-4xl my-5 gap-2">
        <div className="w-full bg-purple-300 flex items-center">
          <span className="w-[30%] bg-red-300">Sat</span>
          <i className="w-[30%] bg-blue-300 wi wi-night-sleet" />
          <span className="w-[20%] bg-rose-500">16</span>
          <span className="w-[20%] bg-orange-300">9</span>
        </div>
        <div className="w-full bg-purple-300 flex items-center">
          <span className="w-[30%] bg-red-300">Sun</span>
          <i className="w-[30%] bg-blue-300 wi wi-day-sunny" />
          <span className="w-[20%] bg-rose-500">44</span>
          <span className="w-[20%] bg-orange-300">1</span>
        </div>
        <div className="w-full bg-purple-300 flex items-center">
          <span className="w-[30%] bg-red-300">Mon</span>
          <i className="w-[30%] bg-blue-300 wi wi-day-rain" />
          <span className="w-[20%] bg-rose-500">3</span>
          <span className="w-[20%] bg-orange-300">18</span>
        </div>
      </div>

      {/* <table className="w-full my-5 text-4xl">
        <tbody>
          <tr className="">
            <td>Sat</td>
            <td>
              <i className="wi wi-night-sleet" />
            </td>
            <td>25</td>
            <td className="font-thin">9</td>
          </tr>
          <tr>
            <td>Sun</td>
            <td>
              <i className="wi wi-day-sunny" />
            </td>
            <td>26</td>
            <td className="font-thin">7</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};

export default Weather;
