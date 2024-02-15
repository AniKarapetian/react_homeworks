
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherData, WeatherResponse } from '../../components/weather/weather.type';

const apiKey = 'efd7b7452732382b5f3424e56caf9ccc';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city:string, { rejectWithValue }) => {
    try {

      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState : WeatherResponse = {
    data: {},
    loading: false,
    error: '',
  }

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload.cod == 404){
            state.error = action.payload.message;
        }
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;
