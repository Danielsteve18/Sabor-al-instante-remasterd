import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabor al Instante",
  description: "Menú, ofertas diarias y reservas de Sabor al Instante.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
