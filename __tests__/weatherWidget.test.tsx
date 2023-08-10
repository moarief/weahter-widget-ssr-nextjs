import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { WeatherWidget } from "./../components/weatherWidget";
import { MemoryRouter } from "react-router";

// Mock useSearchParams from next/navigation
jest.mock("next/navigation", () => {
  // Require the original module
  const originalModule = jest.requireActual("next/navigation");
  // Return a modified module
  return {
    // Preserve other exports
    ...originalModule,
    // Override useSearchParams with a custom implementation
    useSearchParams: () => {
      // Create a mock URLSearchParams object with some query parameters
      const searchParams = new URLSearchParams({
        city: "Copenhagen",
      });
      // Return the mock object as the first element of an array
      return [searchParams];
    },
    useRouter: jest.fn(),
  };
});

// Write the test cases
describe("MyComponent", () => {
  // Test case for a specific query string
  test("should display something when query string is foo=bar&baz=qux", () => {
    // Render the component with MemoryRouter and pass in the query string as initialEntries
    render(
      <MemoryRouter initialEntries={["/?city=Copenhagen"]}>
        <WeatherWidget />
      </MemoryRouter>
    );

    // Expect to see something on the screen based on the query string
    expect(screen.getByText("Copenhagen")).toBeTruthy();
  });
});
