export type LocationSource = 'search' | 'favorite' | 'recent' | 'geolocation' | 'map';

export interface WeatherLocation {
  id: string;
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
  label: string;
  source: LocationSource;
}

export interface CurrentConditions {
  observedAt: number;
  summary: string;
  description: string;
  icon: string;
  temperatureC: number;
  feelsLikeC: number;
  humidity: number;
  pressure: number;
  windSpeedMs: number;
  windDeg: number;
  visibilityM: number;
  uvIndex: number;
  cloudCover: number;
  precipitationMm: number;
  sunrise: number;
  sunset: number;
  dewPointC: number;
}

export interface HourlyForecastPoint {
  timestamp: number;
  temperatureC: number;
  feelsLikeC: number;
  precipitationProbability: number;
  precipitationMm: number;
  windSpeedMs: number;
  windDeg: number;
  cloudCover: number;
  icon: string;
  summary: string;
}

export interface DailyForecastPoint {
  timestamp: number;
  sunrise: number;
  sunset: number;
  summary: string;
  icon: string;
  minTempC: number;
  maxTempC: number;
  precipitationProbability: number;
  precipitationMm: number;
  windSpeedMs: number;
  windDeg: number;
  humidity: number;
  uvIndex: number;
}

export interface WeatherAlert {
  sender: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export interface AirQualitySummary {
  aqi: number;
  label: string;
  components: Record<string, number>;
}

export interface HistoricalSummary {
  available: boolean;
  points: HourlyForecastPoint[];
}

export interface CurrentConditionsHistorySummary {
  temperatureChangeC: number;
  maxTemperatureC: number;
  minTemperatureC: number;
  precipitationMm: number;
}

export interface WeatherDashboard {
  location: WeatherLocation;
  timezone: string;
  timezoneOffset: number;
  current: CurrentConditions;
  currentHistory: CurrentConditionsHistorySummary | null;
  hourly: HourlyForecastPoint[];
  daily: DailyForecastPoint[];
  alerts: WeatherAlert[];
  airQuality: AirQualitySummary | null;
  historical: HistoricalSummary | null;
  warnings: string[];
  providerForecastDays: number;
  fetchedAt: number;
}

export interface DashboardRequestBody {
  location: WeatherLocation;
  forceRefresh?: boolean;
}
