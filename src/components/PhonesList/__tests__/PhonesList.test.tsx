import React from "react";
import { render, screen } from "@testing-library/react";
import PhonesList from "../PhonesList";
import { Phone } from "@/types";

// Mock next/link
jest.mock("next/link", () => {
  function Link({
    children,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return <a {...props}>{children}</a>;
  }
  Link.displayName = "Link";
  return Link;
});

// Mock PhoneCard component
jest.mock("@/components/PhoneCard/PhoneCard", () => {
  return function MockPhoneCard(props: {
    name: string;
    price: number;
    image: string;
    brand: string;
  }) {
    return (
      <div data-testid='phone-card'>
        <p>Name: {props.name}</p>
        <p>Price: ${props.price}</p>
        <p>Brand: {props.brand}</p>
      </div>
    );
  };
});

// Mock CSS module
jest.mock("../PhonesList.module.scss", () => ({
  PhonesList: "PhonesList",
}));

describe("PhonesList Component", () => {
  const mockPhones: Phone[] = [
    {
      id: "1",
      name: "iPhone 14 Pro",
      brand: "Apple",
      basePrice: 999,
      imageUrl: "/images/iphone-14-pro.jpg",
      description: "Description 1",
      rating: 4.5,
      colorOptions: [
        {
          hexCode: "#000000",
          imageUrl: "/images/iphone-14-pro-black.jpg",
          name: "Space Black",
        },
      ],
      storageOptions: [
        {
          capacity: "128GB",
          price: 999,
        },
      ],
      specs: {
        battery: "3200 mAh",
        mainCamera: "48MP",
        os: "iOS 16",
        processor: "A16 Bionic",
        resolution: "2556 x 1179",
        screen: '6.1"',
        screenRefreshRate: "120Hz",
        selfieCamera: "12MP",
      },
      similarProducts: [
        {
          id: "2",
          imageUrl: "/images/iphone-13-pro.jpg",
          name: "iPhone 13 Pro",
          basePrice: 899,
          brand: "Apple",
        },
      ],
    },
    {
      id: "2",
      name: "Samsung Galaxy S23",
      brand: "Samsung",
      basePrice: 899,
      imageUrl: "/images/galaxy-s23.jpg",
      description: "Description 2",
      rating: 4.7,
      colorOptions: [
        {
          hexCode: "#000000",
          imageUrl: "/images/galaxy-s23-black.jpg",
          name: "Phantom Black",
        },
      ],
      storageOptions: [
        {
          capacity: "256GB",
          price: 899,
        },
      ],
      specs: {
        battery: "3900 mAh",
        mainCamera: "50MP",
        os: "Android 13",
        processor: "Snapdragon 8 Gen 2",
        resolution: "2340 x 1080",
        screen: '6.1"',
        screenRefreshRate: "120Hz",
        selfieCamera: "12MP",
      },
      similarProducts: [
        {
          id: "1",
          imageUrl: "/images/galaxy-s22.jpg",
          name: "Samsung Galaxy S22",
          basePrice: 799,
          brand: "Samsung",
        },
      ],
    },
  ];

  it("renders a list of phones", () => {
    render(<PhonesList phones={mockPhones} />);

    const phoneCards = screen.getAllByTestId("phone-card");
    expect(phoneCards).toHaveLength(2);
  });

  it("renders phone information correctly", () => {
    render(<PhonesList phones={mockPhones} />);

    expect(screen.getByText("Name: iPhone 14 Pro")).toBeInTheDocument();
    expect(screen.getByText("Price: $999")).toBeInTheDocument();
    expect(screen.getByText("Brand: Apple")).toBeInTheDocument();

    expect(screen.getByText("Name: Samsung Galaxy S23")).toBeInTheDocument();
    expect(screen.getByText("Price: $899")).toBeInTheDocument();
    expect(screen.getByText("Brand: Samsung")).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    render(<PhonesList phones={mockPhones} />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/phones/1");
    expect(links[1]).toHaveAttribute("href", "/phones/2");
  });

  it("applies correct CSS class", () => {
    const { container } = render(<PhonesList phones={mockPhones} />);
    expect(container.firstChild).toHaveClass("PhonesList");
  });

  it("renders empty list when no phones provided", () => {
    render(<PhonesList phones={[]} />);
    expect(screen.queryByTestId("phone-card")).not.toBeInTheDocument();
  });
});
