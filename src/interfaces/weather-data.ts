export interface WeatherDescription {
  description: string
  code: number
  icon: string
}

export interface WeatherData {
  app_max_temp: number
  app_min_temp: number
  datetime: string
  high_temp: number
  low_temp: number
  max_temp: number
  min_temp: number
  temp: number
  valid_date: string
  weather: WeatherDescription
}
