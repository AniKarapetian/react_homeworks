import React, { FC } from "react";
import { WeatherProps } from "./weather.type";

import { Card } from "react-bootstrap";
const WeatherHeader: FC<WeatherProps> = ({ data }) => {
  return (
    <Card className="text-center mb-3">
      <Card.Header>
        <Card.Title>Weather for {data?.city?.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b> Sunrise:</b> {`${new Date(data?.city?.sunrise! * 1000)}`}
        </Card.Text>
        <Card.Text>
          <b> Sunset:</b> {`${new Date(data?.city?.sunset! * 1000)}`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WeatherHeader;
