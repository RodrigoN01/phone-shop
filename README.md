# Smartphones Shop

A modern e-commerce application built with Next.js for browsing and purchasing smartphones.

## Features

- Browse smartphones catalog
- View detailed phone specifications
- Select phone colors and storage options
- Shopping cart functionality
- Responsive design
- Client-side state management with React Context

## Tech Stack

- **Framework:** Next.js 15.1.7 with App Router
- **Language:** TypeScript
- **Styling:** SASS/SCSS
- **State Management:** React Context
- **Testing:**
  - Jest for unit and integration testing
  - React Testing Library for component testing
- **UI Libraries:**
  - clsx for conditional class names
  - react-responsive for responsive design
  - lucide-react for icons

## Getting Started

1. Clone the repository
2. Install dependencies:

```sh
npm install
```

3. Run the development server:

```sh
npm run dev
```

4. Build the application:

```sh
npm run build
```

5. Start the application:

```sh
npm start
```

## Testing

The project uses Jest and React Testing Library for testing. Tests are located in `__tests__` directories alongside the components they test.

Run tests:

```sh
npm test
```

Run tests in watch mode:

```sh
npm run test:watch
```

### Test Coverage

Tests cover key components and functionality including:

- Header component with cart functionality
- Button component with variants
- PhoneCard component for displaying phone information
- PhonesList component for rendering phone catalogs
- SearchBar component with filtering functionality
- BackButton component for navigation

Each component test suite includes:

- Rendering tests
- User interaction tests
- State management tests
- Style and className tests
- Conditional rendering tests

## Project Structure

```markdown
src/
├── app/ # Next.js app router pages
├── components/ # Reusable UI components
│ └── **tests**/ # Component tests
├── context/ # React Context providers
├── hooks/ # Custom React hooks
├── services/ # API services and utilities
└── types/ # TypeScript type definitions
```
