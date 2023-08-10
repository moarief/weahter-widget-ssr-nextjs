import envVariables from "@/env";
import { WeatherData } from "../types";

export const fetchWeatherData = async (
  city: string /* country: string, lang: string */
) => {
  try {
    // Replace 'YOUR_API_URL' with the actual API endpoint URL for fetching weather data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},dk&appid=6228b446e4385406ea26d2d052c59bbf&units=metric&lang=da`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
