import { WeatherWidget } from "@/components/weatherWidget";
import getQueryClient from "@/lib/getQueryClient";
import Hydrate from "@/lib/hydrate.client";
import { fetchWeatherData } from "@/lib/services/weatherAPI";
import { dehydrate } from "@tanstack/query-core";

export default async function Home({
  searchParams,
}: {
  params: {};
  searchParams: { city: string };
}) {
  const city = searchParams.city;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["hydrate-weather"],
    queryFn: () => fetchWeatherData(city),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <WeatherWidget />
        </div>
      </main>
    </Hydrate>
  );
}
