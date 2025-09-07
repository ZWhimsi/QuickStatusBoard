// Weather API configuration
const WEATHER_API_KEY = "8be5144592c3d90ecfb249e32f0ae8b6"; // Your OpenWeatherMap API key
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherData = async (latitude, longitude) => {
  try {
    if (!WEATHER_API_KEY || WEATHER_API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
      return {
        temperature: "N/A",
        description: "Weather API not configured",
        icon: "❓",
      };
    }

    console.log(`Fetching weather for: ${latitude}, ${longitude}`);
    console.log(`API Key: ${WEATHER_API_KEY.substring(0, 8)}...`);

    const response = await fetch(
      `${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    console.log(`Weather API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Weather API error response: ${errorText}`);

      // If 401 error, return mock weather data instead of failing
      if (response.status === 401) {
        console.log("API key invalid - returning mock weather data");
        return {
          temperature: "22°C",
          description: "Partly cloudy (Mock Data)",
          icon: "⛅",
          humidity: "65%",
          windSpeed: "3.2 m/s",
        };
      }

      throw new Error(
        `Weather API request failed: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    console.log("Weather API data received:", data);

    return {
      temperature: `${Math.round(data.main.temp)}°C`,
      description: data.weather[0].description,
      icon: getWeatherIcon(data.weather[0].icon),
      humidity: `${data.main.humidity}%`,
      windSpeed: `${data.wind.speed} m/s`,
    };
  } catch (error) {
    console.error("Weather API error:", error);

    // Return mock weather data as fallback
    console.log("Returning mock weather data due to error");
    return {
      temperature: "22°C",
      description: "Partly cloudy (Mock Data)",
      icon: "⛅",
      humidity: "65%",
      windSpeed: "3.2 m/s",
    };
  }
};

const getWeatherIcon = (iconCode) => {
  const iconMap = {
    "01d": "☀️",
    "01n": "🌙",
    "02d": "⛅",
    "02n": "☁️",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧️",
    "09n": "🌧️",
    "10d": "🌦️",
    "10n": "🌧️",
    "11d": "⛈️",
    "11n": "⛈️",
    "13d": "❄️",
    "13n": "❄️",
    "50d": "🌫️",
    "50n": "🌫️",
  };
  return iconMap[iconCode] || "❓";
};
