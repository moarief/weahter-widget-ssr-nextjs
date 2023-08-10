import * as z from "zod";

export const CoordsSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export const MainSchema = z.object({
  feels_like: z.number(),
  humidity: z.number(),
  pressure: z.number(),
  temp: z.number(),
  temp_max: z.number(),
  temp_min: z.number(),
});

export const Wind = z.object({
  deg: z.number(),
  gust: z.number(),
  speed: z.number(),
});

export const SysSchema = z.object({
  type: z.number(),
  id: z.number(),
  country: z.string(),
  sunrise: z.number(),
  sunset: z.number(),
});

export const WeatherSchema = z.tuple([
  z.object({
    id: z.string(),
    main: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
]);

export const WeatherDataSchema = z.object({
  name: z.string(),
  base: z.string(),
  timezone: z.number(),
  cod: z.number(),
  id: z.number(),
  dt: z.number(),
  visibility: z.number(),
  clouds: z.object({ all: z.number() }),
  rain: z.object({ "1h": z.number() }),
  coords: CoordsSchema,
  main: MainSchema,
  wind: Wind,
  sys: SysSchema,
  weather: WeatherSchema,
});

export type WeatherData = z.infer<typeof WeatherDataSchema>;