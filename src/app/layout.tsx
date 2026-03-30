import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Using Outfit as NOHEMI stand-in — swap with real NOHEMI files when available
const nohemi = localFont({
  src: [
    { path: "../../public/fonts/Outfit-Variable.ttf", style: "normal" },
  ],
  variable: "--font-nohemi",
  display: "swap",
  fallback: ["Outfit", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Estilo Perrón — Ropa Premium para Perrhijos",
  description: "La marca mexicana de ropa premium para perros. Hoodies, chamarras, playeras y accesorios con estilo, calidad y actitud perrona. Envío a todo México.",
  keywords: ["ropa para perros", "ropa premium perros", "hoodie perro", "Estilo Perrón", "moda canina México"],
  openGraph: {
    title: "Estilo Perrón — Ropa Premium para Perrhijos",
    description: "La marca mexicana de ropa premium para perros con actitud.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${nohemi.variable}`}>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
