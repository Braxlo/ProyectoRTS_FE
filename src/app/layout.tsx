import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import NotificationToast from "@/components/NotificationToast";
import FullscreenButton from "@/components/FullscreenButton";
import FullscreenHelp from "@/components/FullscreenHelp";
import ErrorBoundary from "@/components/ErrorBoundary";
import ChunkErrorHandler from "@/components/ChunkErrorHandler";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Gestión de Restaurantes",
  description: "Sistema completo para la gestión administrativa de restaurantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          <ChunkErrorHandler />
          <Navigation />
          <main>
            {children}
          </main>
          <NotificationToast />
          <FullscreenButton />
          <FullscreenHelp />
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
