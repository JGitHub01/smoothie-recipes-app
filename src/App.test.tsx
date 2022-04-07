import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app title", async () => {
  render(<App />);
  const linkElement = await screen.findByText(/My Smoothie Recipes/i);
  expect(linkElement).toBeVisible();
});
