import React, { FC } from "react";
import classes from "./style.module.css";
import { WeatherProps } from "./weather.type";
const WeatherHeader: FC<WeatherProps> = ({ data }) => {
  return (
    <div className={classes.cardHeader}>
      <h2 className={classes.txt}>Weather for {data?.city?.name}</h2>
      {data?.city?.sunrise && (
        <p>
          <b> Sunrise:</b> {`${new Date(data?.city?.sunrise * 1000)}`}
        </p>
      )}
      {data?.city?.sunset && (
        <p>
          <b>Sunset:</b> {`${new Date(data?.city?.sunset * 1000)}`}
        </p>
      )}
    </div>
  );
};

export default WeatherHeader;
