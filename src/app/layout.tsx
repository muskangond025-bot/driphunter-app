import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import { AddressProvider } from "@/context/AddressContext";
import { PaymentProvider } from "@/context/PaymentContext";
import { LanguageProvider } from "@/context/LanguageContext";
import AgentationWrapper from "@/components/layout/AgentationWrapper";
import SmoothScroll from "@/components/SmoothScroll";

// Statically define font variables to bypass network calls in offline sandbox builds
const inter = { variable: "--font-sans" };
const geistSans = { variable: "--font-geist-sans" };
const geistMono = { variable: "--font-geist-mono" };
const montserrat = { variable: "--font-montserrat" };
const playfair = { variable: "--font-playfair" };
const bodoni = { variable: "--font-bodoni" };

export const metadata: Metadata = {
  title: "DRIP HUNTER — Premium Curated Streetwear Archive",
  description: "Premium curated streetwear archive. Shop oversized fits, bold graphics, tech vests, and exclusive drops from the world's finest labels.",
};

import { LiveChatProvider } from "@/context/LiveChatContext";
import LiveChatWidget from "@/components/LiveChat/LiveChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        montserrat.variable,
        playfair.variable,
        bodoni.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            <LanguageProvider>
              <AddressProvider>
                <PaymentProvider>
                  <LiveChatProvider>
                    <SmoothScroll>
                      {children}
                    </SmoothScroll>
                    <AgentationWrapper />
                    <LiveChatWidget />
                  </LiveChatProvider>
                </PaymentProvider>
              </AddressProvider>
            </LanguageProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

