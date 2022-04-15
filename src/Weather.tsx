import React, { useEffect, useState } from "react";

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

  return <div>{fetchedWeather?.current.dew_point}</div>;
};

export default Weather;
