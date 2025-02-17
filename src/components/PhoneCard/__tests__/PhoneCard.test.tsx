import React from "react";
import { render, screen } from "@testing-library/react";
import PhoneCard from "../PhoneCard";

// Mock CSS module
jest.mock("../PhoneCard.module.scss", () => ({
  PhoneCard: "PhoneCard",
  PhoneCard__image: "PhoneCard__image",
  PhoneCard__brand: "PhoneCard__brand",
  PhoneCard__info: "PhoneCard__info",
}));

interface ImageProps {
  src: string;
  alt: string;
  width: string | number;
  height: string | number;
  className?: string;
  priority?: string;
}

// Mock next/image since it's used in the component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    // Convert boolean priority to string to avoid React warning
    const imgProps = {
      ...props,
      priority: props.priority?.toString(),
    };
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...imgProps} alt={props.alt} />;
  },
}));

describe("PhoneCard Component", () => {
  const mockProps = {
    name: "iPhone 14 Pro",
    image: "/images/iphone-14-pro.jpg",
    price: 999,
    brand: "Apple",
  };

  it("renders phone information correctly", () => {
    render(<PhoneCard {...mockProps} />);

    // Check if all the information is displayed
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByText(mockProps.brand)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProps.price}`)).toBeInTheDocument();
  });

  it("renders image with correct attributes", () => {
    render(<PhoneCard {...mockProps} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockProps.image);
    expect(image).toHaveAttribute("alt", mockProps.name);
    expect(image).toHaveAttribute("width", "220");
    expect(image).toHaveAttribute("height", "220");
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<PhoneCard {...mockProps} />);

    expect(container.firstChild).toHaveClass("PhoneCard");
    expect(screen.getByRole("img")).toHaveClass("PhoneCard__image");
    expect(screen.getByText(mockProps.brand)).toHaveClass("PhoneCard__brand");
  });
});
