import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Department from "./Depertment";

describe("Department component", () => {
  test("renders department title and description", async () => {
    const department = {
      title: "Computer Science",
      description: "Study computer programming and software development",
    };
    const slug = "computer-science";
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => department,
    });

    render(
      <MemoryRouter initialEntries={[`/departments/${slug}`]}>
        <Route path="/departments/:slug">
            <Department />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await screen.findByText(department.title);
    expect(screen.getByText(department.title)).toBeInTheDocument();

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();

    expect(screen.getByText(department.description)).toBeInTheDocument();
  });

  test("renders error message when department fetch fails", async () => {
    const slug = "computer-science";
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
    });

    render(
      <MemoryRouter initialEntries={[`/departments/${slug}`]}>
        <Route path="/departments/:slug">
          <Department />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    const errorMessage = await screen.findByText("Villa við að sækja deild.");
    expect(errorMessage).toBeInTheDocument();
  });
});
