import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const FORECAST_TIMES = ['09:00', '12:00', '15:00', '18:00', '21:00']

const openWeatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
    units: 'metric',
  },
})

const geocodingClient = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0',
  params: {
    appid: API_KEY,
  },
})

const getLocationParams = (location) => {
  if (typeof location === 'string') {
    return { q: location }
  }

  return { lat: location.lat, lon: location.lon }
}

export const getCurrentWeather = (location) => {
  if (!API_KEY) {
    throw new Error('.env 파일에 VITE_OPENWEATHER_API_KEY를 설정하세요.')
  }

  return openWeatherClient.get('/weather', {
    params: getLocationParams(location),
  })
}

export const getForecast = (location) => {
  if (!API_KEY) {
    throw new Error('.env 파일에 VITE_OPENWEATHER_API_KEY를 설정하세요.')
  }

  return openWeatherClient.get('/forecast', {
    params: getLocationParams(location),
  })
}

export const findLocation = async (cityName) => {
  if (!API_KEY) {
    throw new Error('.env 파일에 VITE_OPENWEATHER_API_KEY를 설정하세요.')
  }

  const response = await geocodingClient.get('/direct', {
    params: {
      q: cityName,
      limit: 1,
    },
  })

  if (response.data.length === 0) {
    throw new Error('입력한 지역을 찾을 수 없습니다. 도시명이나 영문 이름을 확인하세요.')
  }

  return response.data[0]
}

export const toTimeForecasts = (data) => {
  const forecastsByTime = new Map()

  data.list.forEach((item) => {
    const localDate = new Date((item.dt + data.city.timezone) * 1000)
    const hour = String(localDate.getUTCHours()).padStart(2, '0')
    const time = `${hour}:00`

    if (!FORECAST_TIMES.includes(time) || forecastsByTime.has(time)) {
      return
    }

    forecastsByTime.set(time, {
      time,
      temp: Math.round(item.main.temp),
      // 매핑 전 단계: OpenWeatherMap의 영어 상태값을 그대로 사용한다.
      status: item.weather?.[0]?.main ?? 'Unknown',
    })
  })

  return FORECAST_TIMES.map((time) => forecastsByTime.get(time)).filter(Boolean)
}
