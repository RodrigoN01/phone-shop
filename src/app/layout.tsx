import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Smartphones Shop",
  description: "The shop with the best smartphones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <main>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </main>
      </body>
    </html>
  );
}
