// Weather API integration for exceptional features
// You'll need to sign up for a free API key at https://openweathermap.org/api

const WEATHER_API_KEY = 'your-openweathermap-api-key-here'; // Replace with your actual API key
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Get current weather for given coordinates
export const getCurrentWeather = async (latitude, longitude) => {
  try {
    const url = `${WEATHER_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.cod === 200) {
      return {
        success: true,
        weather: {
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          city: data.name,
          country: data.sys.country
        }
      };
    } else {
      return {
        success: false,
        error: data.message || 'Failed to fetch weather data'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error while fetching weather'
    };
  }
};

// Get weather for a specific city
export const getWeatherByCity = async (cityName) => {
  try {
    const url = `${WEATHER_BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${WEATHER_API_KEY}&units=metric`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.cod === 200) {
      return {
        success: true,
        weather: {
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          city: data.name,
          country: data.sys.country
        }
      };
    } else {
      return {
        success: false,
        error: data.message || 'Failed to fetch weather data'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Network error while fetching weather'
    };
  }
};

// Format weather for display in status
export const formatWeatherForStatus = (weather) => {
  if (!weather) return '';
  
  const emoji = getWeatherEmoji(weather.icon);
  return `${emoji} ${weather.temperature}°C, ${weather.description} in ${weather.city}`;
};

// Get weather emoji based on weather icon code
const getWeatherEmoji = (iconCode) => {
  const emojiMap = {
    '01d': '☀️', // clear sky day
    '01n': '🌙', // clear sky night
    '02d': '⛅', // few clouds day
    '02n': '☁️', // few clouds night
    '03d': '☁️', // scattered clouds
    '03n': '☁️',
    '04d': '☁️', // broken clouds
    '04n': '☁️',
    '09d': '🌧️', // shower rain
    '09n': '🌧️',
    '10d': '🌦️', // rain day
    '10n': '🌧️', // rain night
    '11d': '⛈️', // thunderstorm
    '11n': '⛈️',
    '13d': '❄️', // snow
    '13n': '❄️',
    '50d': '🌫️', // mist
    '50n': '🌫️'
  };
  
  return emojiMap[iconCode] || '🌤️';
};
