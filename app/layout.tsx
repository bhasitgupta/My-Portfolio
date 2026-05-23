import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisProvider } from "@/components/LenisProvider";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Bhasit Gupta | Developer",
  description: "AI/ML Developer & Full Stack Engineer. Building at the intersection of intelligence and craft.",
  keywords: ["Bhasit Gupta", "Developer", "AI ML", "Full Stack", "Portfolio"],
  authors: [{ name: "Bhasit Gupta" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
