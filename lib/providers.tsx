"use client";
import { Children, cloneElement, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useSearchParams } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());
  const searchParams = useSearchParams();

  // Get the current city value or use Copenhagen as default
  const city = searchParams.get("city") || "Copenhagen";

  const childrenWithCity = Children.map(children, (child) =>
    cloneElement(child as React.ReactElement, { city })
  );

  return (
    // Provide the query client to the app
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>
        {/* Pass props to children */}
        {childrenWithCity}
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
