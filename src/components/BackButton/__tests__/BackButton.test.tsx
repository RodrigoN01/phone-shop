import React from "react";
import { render, screen } from "@testing-library/react";
import BackButton from "../BackButton";

// Mock CSS module
jest.mock("../BackButton.module.scss", () => ({
  BackButton: "BackButton",
  BackButton__inner: "BackButton__inner",
}));

// Mock next/link since it's used in the component
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

// Mock lucide-react ChevronLeft icon
jest.mock("lucide-react", () => ({
  ChevronLeft: () => <span data-testid='chevron-left-icon' />,
}));

describe("BackButton Component", () => {
  it("renders back text", () => {
    render(<BackButton />);
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("renders chevron left icon", () => {
    render(<BackButton />);
    expect(screen.getByTestId("chevron-left-icon")).toBeInTheDocument();
  });

  it("renders link with correct href", () => {
    render(<BackButton />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<BackButton />);

    expect(container.firstChild).toHaveClass("BackButton");
    expect(screen.getByRole("link")).toHaveClass("BackButton__inner");
  });
});
