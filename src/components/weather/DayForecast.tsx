import React from "react";
import { FC } from "react";
import { WeatherProps } from "./weather.type";

import { Container, Col, Row, Card, Accordion } from "react-bootstrap";
import DayForecastTable from "./DayForecastTable";

const DayForecast: FC<WeatherProps> = ({ data }) => {
  const convertKelvinToCelcius = (temp: number) => {
    return Number(temp - 273.15).toFixed(1);
  };
  return (
    <div>
      <Accordion>
        {data?.list?.map((info, index) => (
          <Accordion.Item eventKey={`${info.dt}`} key={info.dt}>
            <Accordion.Header>
              <Container>
                <Row>
                  <Col>
                    <p>{info.dt_txt}</p>
                  </Col>
                  <Col>
                    <p>{convertKelvinToCelcius(info.main.temp)} °C</p>
                  </Col>
                  <Col>
                    {info.weather.map((data) => (
                      <div key={data.id}>
                        <img
                          src={`http://openweathermap.org/img/wn/${data.icon}.png`}
                          alt="Weather Icon"
                        />
                      </div>
                    ))}
                  </Col>
                </Row>
              </Container>
            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <DayForecastTable info={info} />
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default DayForecast;
