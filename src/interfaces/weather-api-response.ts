import { WeatherData } from "./weather-data"

export interface WeatherResponse {
  city_name: string
  country_code: string
  data: WeatherData[]
  lat: string
  lon: string
  state_code: string
  timezone: string
}
export { WeatherData }
