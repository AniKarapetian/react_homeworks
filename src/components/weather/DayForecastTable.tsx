import React, { FC } from "react";
import { Table } from "react-bootstrap";
import { DayForecastInfo } from "./weather.type";
type TableProps = {
  info: DayForecastInfo;
};

const DayForecastTable: FC<TableProps> = ({ info }) => {
  const convertKelvinToCelcius = (temp: number) => {
    return Number(temp - 273.15).toFixed(1);
  };
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Min °C</th>
            <th>Max °C</th>
            <th>Feels like °C</th>
            <th>Pressure hPa</th>
            <th>Humidity %</th>
            <th>Day Forecast</th>
            <th>Clouds %</th>
            <th>Rain (3 hrs) mm </th>
            <th>Snow (3 hrs) mm</th>
            <th>Wind m/sec</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{convertKelvinToCelcius(info.main.temp_min)} </td>
            <td>{convertKelvinToCelcius(info.main.temp_max)}</td>
            <td>{convertKelvinToCelcius(info.main.feels_like)}</td>
            <td>{info.main.pressure} </td>
            <td>{info.main.humidity} </td>
            <td>
              {info.weather.map((data) => (
                <div key={data.id}>
                  <p> {data.main}</p>
                  <p>
                    <i>{data.description}</i>
                  </p>
                </div>
              ))}
            </td>
            <td>{info.clouds.all} </td>
            <td> {info.rain && <p> {info.rain["3h"]}</p>}</td>
            <td> {info.snow && <p>{info.snow["3h"]}</p>}</td>
            <td>{info.wind.speed}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DayForecastTable;
