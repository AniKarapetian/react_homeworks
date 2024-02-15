import React from "react";
import { FC } from "react";
import { WeatherProps } from "./weather.type";

const DayForecast: FC<WeatherProps> = ({ data }) => {
  const convertKelvinToCelcius = (temp: number) => {
    return Number(temp - 273.15).toFixed(1);
  };
  return (
    <div>
      {data?.list?.map((info, index) => {
        return (
          <div key={index}>
            <p>Date: {info.dt_txt}</p>
            <p>Temperature: {convertKelvinToCelcius(info.main.temp)} °C</p>
            <p>
              Min Temperature: {convertKelvinToCelcius(info.main.temp_min)} °C
            </p>
            <p>
              Max Temperature: {convertKelvinToCelcius(info.main.temp_max)} °C
            </p>
            <p>Feels like: {convertKelvinToCelcius(info.main.feels_like)} °C</p>
            <p>Pressure: {info.main.pressure} hPa</p>
            <p>Humidity: {info.main.humidity} %</p>
            {info.weather.map((data) => (
              <div key={data.id}>
                <p>Main: {data.main}</p>
                <p>Description: {data.description}</p>
              </div>
            ))}

            <p>Clouds: {info.clouds.all} %</p>
            {info.rain && <p>Rain for last 3 hours: {info.rain["3h"]}mm</p>}
            {info.snow && <p>Snow for last 3 hours: {info.snow["3h"]}mm</p>}
            <p>Wind: {info.wind.speed} meter/sec</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default DayForecast;
