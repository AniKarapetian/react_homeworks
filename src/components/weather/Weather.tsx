import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/type/index";
import { fetchWeather } from "../../store/weather/weather-slice";
import { WeatherQuery, WeatherResponse } from "./weather.type";
import classes from "./style.module.css";
import DayForecast from "./DayForecast";
import WeatherHeader from "./WeatherHeader";

import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

import { Button } from "react-bootstrap";
import { getCurrentPosition } from "./helper";
import { LeafletMouseEvent } from "leaflet";
import WeatherMap from "./WeatherMap";
const Weather: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const weather: WeatherResponse = useSelector(
    (state: RootState) => state.weather
  );
  const [city, setCity] = useState("");
  const [position, setPosition] = useState<WeatherQuery>({});

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    if (position.latitude && position.longitude) {
      dispatch(fetchWeather(position));
    }
  }, [position.latitude, position.longitude]);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    setPosition({
      latitude: weather.data?.city?.coord.lat,
      longitude: weather.data?.city?.coord.lon,
      city: weather.data.city?.name,
    });
  }, [weather]);

  const getLocation = async () => {
    const { latitude, longitude } = await getCurrentPosition();
    setPosition({ ...position, latitude, longitude });
  };
  const searchForecast = () => {
    dispatch(fetchWeather({ city }));
  };

  const handleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  };
  return (
    <div className={classes.container}>
      <div style={{ display: "flex" }}>
        <InputGroup className="mb-3">
          <InputGroup.Text>City</InputGroup.Text>
          <Form.Control
            type="text"
            value={city}
            name="city"
            onChange={handleCityChange}
          />
        </InputGroup>

        <Button
          onClick={searchForecast}
          variant="secondary"
          className={classes.searchBtn}
        >
          Search
        </Button>
      </div>
      {weather.loading && <p className={classes.txt}>Loading...</p>}
      {weather.error && (
        <p className={classes.errorTxt}>Error: {weather.error}</p>
      )}
      {weather.data && !weather.error && (
        <div>
          {position.latitude && position.longitude && (
            <WeatherMap
              data={{
                lat: Number(position.latitude),
                lon: Number(position.longitude),
                city: position.city || "",
                onMapClick: handleMapClick,
              }}
            />
          )}
          {weather.data.city && <WeatherHeader data={weather.data} />}
          <DayForecast data={weather.data} />
        </div>
      )}
    </div>
  );
};

export default Weather;
