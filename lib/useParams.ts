// src/app/useName.tsx
"use client";

export default function useName() {
  // Get the query string from the window location
  const queryString = window.location.search;

  // Parse the query string using the URLSearchParams constructor
  const searchParams = new URLSearchParams(queryString);

  // Get and return the value of the "name" parameter
  return searchParams.get("city");
}
