import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '../components/styles/index.css';
import { Header } from '../components/component/header'
import { Footer } from '../components/component/footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Juliana Ramos - Moda Feminina",
  description: "E-commerce de roupas femininas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
