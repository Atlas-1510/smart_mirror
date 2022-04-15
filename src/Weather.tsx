import React, { useEffect, useState } from "react";
import "./styles/weather-icons.min.css";

// refresh every five minutes.
const refreshInterval = 1000 * 60 * 5;

interface IntWeather {
  current: any;
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

  return (
    <div className=" flex flex-col">
      <div className="  flex justify-center items-center">
        <div>
          <i className="wi wi-night-sleet text-9xl" />
        </div>
        <div className="ml-5 flex flex-col items-center">
          <span className="text-8xl">19°</span>
          <div className="flex">
            <span className="text-4xl m-4">25°</span>
            <span className="text-4xl m-4 font-thin">9°</span>
          </div>
        </div>
      </div>
      <span className=" text-5xl my-5">Light rain</span>
      <div className=" text-3xl">
        <span>
          <i className="wi wi-sunrise"></i>
          <span>6:35 am</span>
        </span>
        <span className="ml-5">
          <i className="wi wi-sunset"></i>
          <span>6:32 pm</span>
        </span>
      </div>

      <div className="grid grid-cols-1 grid-rows-4 bg-green-300 text-4xl my-5 gap-2">
        <div className="w-full bg-purple-300 flex items-center">
          <span className="w-[30%] bg-red-300">Sat</span>
          <i className="w-[30%] bg-blue-300 wi wi-night-sleet" />
          <span className="w-[20%] bg-rose-500">25</span>
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
