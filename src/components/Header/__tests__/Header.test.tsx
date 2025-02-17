import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

interface ImageProps {
  src: string;
  alt: string;
  width: string | number;
  height: string | number;
  className?: string;
  priority?: string | boolean;
}

// Mock next/image
jest.mock("next/image", () => {
  const MockImage = (props: ImageProps) => {
    // Convert priority to string to avoid React DOM warning
    const { priority, ...rest } = props;

    return (
      <div
        data-testid={`mock-image-${props.alt}`}
        role='img'
        aria-label={props.alt}
        style={{
          width:
            typeof props.width === "number" ? `${props.width}px` : props.width,
          height:
            typeof props.height === "number"
              ? `${props.height}px`
              : props.height,
        }}
        data-priority={priority?.toString()}
        {...rest}
      />
    );
  };
  MockImage.displayName = "MockImage";
  return { __esModule: true, default: MockImage };
});

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

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock CartContext
const mockGetCartCount = jest.fn().mockReturnValue(2);
jest.mock("@/context/CartContext", () => ({
  useCart: () => ({
    getCartCount: mockGetCartCount,
  }),
}));

// Mock CSS module
jest.mock("../Header.module.scss", () => ({
  Header: "Header",
  Header__cart: "Header__cart",
  Header__cart__count: "Header__cart__count",
}));

describe("Header Component", () => {
  const mockUsePathname = jest.requireMock("next/navigation").usePathname;

  beforeEach(() => {
    mockUsePathname.mockReset();
    mockUsePathname.mockReturnValue("/");
    mockGetCartCount.mockReset();
    mockGetCartCount.mockReturnValue(2);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo with correct attributes", () => {
    render(<Header />);
    const logo = screen.getByTestId("mock-image-logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/svgs/logo.svg");
    expect(logo).toHaveAttribute("alt", "logo");
    expect(logo.style.width).toBe("74px");
    expect(logo.style.height).toBe("24px");
  });

  it("renders cart icon and count when not on cart page", () => {
    mockUsePathname.mockReturnValue("/");
    mockGetCartCount.mockReturnValue(2);
    render(<Header />);

    const cartIcon = screen.getByTestId("mock-image-bag");
    expect(cartIcon).toBeInTheDocument();
    expect(cartIcon).toHaveAttribute("src", "/svgs/bag-icon-active.svg");
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does not render cart icon when on cart page", () => {
    mockUsePathname.mockReturnValue("/cart");
    render(<Header />);

    expect(screen.queryByTestId("mock-image-bag")).not.toBeInTheDocument();
  });

  it("renders inactive cart icon when cart is empty", () => {
    mockGetCartCount.mockReturnValue(0);
    render(<Header />);

    const cartIcon = screen.getByTestId("mock-image-bag");
    expect(cartIcon).toHaveAttribute("src", "/svgs/bag-icon-inactive.svg");
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    mockGetCartCount.mockReturnValue(2);
    const { container } = render(<Header />);

    expect(container.firstChild).toHaveClass("Header");
    expect(screen.getByRole("link", { name: /bag/i })).toHaveClass(
      "Header__cart"
    );
    expect(screen.getByText("2")).toHaveClass("Header__cart__count");
  });
});
