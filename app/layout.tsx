import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisProvider } from "@/components/LenisProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e1f20",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bhasitportfolio.vercel.app"),
  title: {
    default: "Bhasit Gupta — AI/ML Engineer & Full Stack Developer",
    template: "%s | Bhasit Gupta",
  },
  description:
    "Portfolio of Bhasit Gupta — AI/ML Engineer, Full Stack Developer & Creative Technologist. Building intelligent, scalable, and beautifully crafted digital experiences.",
  keywords: [
    "Bhasit Gupta",
    "AI ML Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Python",
    "FastAPI",
    "PyTorch",
    "Portfolio",
    "Creative Technologist",
    "GSSoC 2026",
  ],
  authors: [{ name: "Bhasit Gupta", url: "https://github.com/bhasitgupta" }],
  creator: "Bhasit Gupta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bhasitportfolio.vercel.app",
    siteName: "Bhasit Gupta Portfolio",
    title: "Bhasit Gupta — AI/ML Engineer & Full Stack Developer",
    description:
      "Portfolio of Bhasit Gupta — AI/ML Engineer, Full Stack Developer & Creative Technologist. Building intelligent, scalable, and beautifully crafted digital experiences.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Bhasit Gupta Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhasit Gupta — AI/ML Engineer & Full Stack Developer",
    description:
      "Portfolio of Bhasit Gupta — AI/ML Engineer, Full Stack Developer & Creative Technologist.",
    images: ["/twitter-image.png"],
    creator: "@Bhasit1009",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
