import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oceano Azul",
  description: "Landing page da Oceano Azul",
  icons: {
    icon: "/images/favicon.ico", // Caminho para o arquivo na pasta public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased">{children}</body>
    </html>
  );
}
