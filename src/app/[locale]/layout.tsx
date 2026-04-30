import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Expatra",
  description: "Your Gateway to the Colombian Dream",
};

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={cn(inter.variable, playfair.variable, jetbrains.variable)}>
      <body className="antialiased font-sans bg-background text-foreground flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <TooltipProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
