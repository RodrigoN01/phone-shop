import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar Component", () => {
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    resultsCount: 10,
  };

  it("renders with placeholder text", () => {
    render(<SearchBar {...defaultProps} />);
    expect(
      screen.getByPlaceholderText("Search for smartphones...")
    ).toBeInTheDocument();
  });

  it("displays the correct number of results", () => {
    render(<SearchBar {...defaultProps} />);
    expect(screen.getByText("10 RESULTS")).toBeInTheDocument();

    // Test with different number of results
    render(<SearchBar {...defaultProps} resultsCount={5} />);
    expect(screen.getByText("5 RESULTS")).toBeInTheDocument();
  });

  it("displays the input value correctly", () => {
    render(<SearchBar {...defaultProps} value='iPhone' />);
    const input = screen.getByPlaceholderText(
      "Search for smartphones..."
    ) as HTMLInputElement;
    expect(input.value).toBe("iPhone");
  });

  it("calls onChange handler when input changes", () => {
    const handleChange = jest.fn();
    render(<SearchBar {...defaultProps} onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Search for smartphones...");
    fireEvent.change(input, { target: { value: "iPhone" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<SearchBar {...defaultProps} />);

    expect(container.firstChild).toHaveClass("SearchBar");
    expect(
      screen.getByPlaceholderText("Search for smartphones...")
    ).toHaveClass("SearchBar__input");
    expect(screen.getByText("10 RESULTS")).toHaveClass(
      "SearchBar__resultsCount"
    );
  });
});
