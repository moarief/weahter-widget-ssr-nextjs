"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "./molecules/search";
import { useRouter, useSearchParams } from "next/navigation";
import { convertWindDirection } from "../lib/helpers/convertWindDirection";
import { fetchWeatherData } from "../lib/services/weatherAPI";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

export const WeatherWidget = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the current city value or use Copenhagen as default
  const city = searchParams.get("city") || "Copenhagen";

  useEffect(() => {
    // Set a default value for the "city" query parameter
    if (!searchParams.get("city")) {
      router.push(`/?city=${city}`);
    }
  }, [searchParams, router, city]);

  const { data: weatherData, isLoading } = useQuery({
    queryKey: ["hydrate-weather"],
    queryFn: () => fetchWeatherData(city),
  });

  return (
    <div className="">
      {weatherData ? (
        <>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Weather in {weatherData.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-b border-t px-6 py-2">
                <span>Temperature: </span>
                <span className="font-bold">{weatherData.main.temp}°C</span>
              </div>
              <div className="border-b px-6 py-2">
                <span>Humidity: </span>
                <span className="font-bold">{weatherData.main.humidity}</span>
              </div>
              <div className="border-b px-6 py-2">
                <span>
                  Wind:{" "}
                  <span className="font-bold">
                    {weatherData.wind.speed} m/s{" "}
                    {convertWindDirection(weatherData?.wind.deg ?? 0)}
                  </span>
                </span>
              </div>
            </CardContent>
            <CardFooter className="mt-3">
              <Search country={"dk"} />
            </CardFooter>
          </Card>
        </>
      ) : isLoading ? (
        <p>loading.....</p>
      ) : !weatherData || weatherData == undefined ? (
        <p>Failed get data...</p>
      ) : null}
    </div>
  );
};
