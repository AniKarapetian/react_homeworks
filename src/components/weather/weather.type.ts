export type WeatherData = {
    city?: {
      name: string;
      sunrise: number;
      sunset: number;
      coord: {
        lat: number;
        lon: number;
      };
    };
    list?: DayForecastInfo[ ];
};
export type WeatherResponse = {
    data: WeatherData;
    loading: boolean;
    error: string;
}


export interface WeatherProps {
    data: WeatherData;
  }


  export type DayForecastInfo={
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    clouds: {
      all: number;
    };
    rain?: {
      "3h": number;
    };
    snow?: {
        "3h": number;
      };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
  }

  export type WeatherQuery = {
    city? : string;
    latitude?: number;
    longitude?: number;
  }