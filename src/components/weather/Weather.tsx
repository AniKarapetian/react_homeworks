import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/type/index";
import { fetchWeather } from "../../store/weather/weather-slice";
import { WeatherResponse } from "./weather.type";
import classes from "./style.module.css";
import DayForecast from "./DayForecast";
import WeatherHeader from "./WeatherHeader";
const Weather: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const weather: WeatherResponse = useSelector(
    (state: RootState) => state.weather
  );
  const [city, setCity] = useState("Yerevan");

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [dispatch]);

  const searchForecast = () => {
    dispatch(fetchWeather(city));
  };
  return (
    <div className={classes.container}>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        className={classes.cityInput}
      />
      <button onClick={searchForecast} className={classes.searchBtn}>
        Search
      </button>
      {weather.loading && <p className={classes.txt}>Loading...</p>}
      {weather.error && (
        <p className={classes.errorTxt}>Error: {weather.error}</p>
      )}
      {weather.data && !weather.error && (
        <div>
          <WeatherHeader data={weather.data} />
          <DayForecast data={weather.data} />
        </div>
      )}
    </div>
  );
};

export default Weather;
