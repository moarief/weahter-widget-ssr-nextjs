import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import { Search } from "@/components/molecules/search";

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

describe("Search component", () => {
  it("should show input field and button", async () => {
    render(<Search country={"dk"} />);

    expect(screen.getByTestId("search-field")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("updating the input field and clicking the button should update query params", async () => {
    const push = jest.fn();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));

    render(<Search country={"dk"} />);

    const input = screen.getByTestId("search-field");
    fireEvent.change(input, { target: { value: "Odense" } });

    await userEvent.click(screen.getByTestId("submit-button"));
    expect(push).toHaveBeenCalledWith("/?city=Odense");
  });
});
