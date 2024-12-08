import type { Metadata } from "next";
import { Inter_Tight, Major_Mono_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";


const majorMono = Major_Mono_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-major-mono",
});


const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Time Machine | Know your age | Age Calculator",
  description: "Simple. Powerful. Revolutionary.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${majorMono.variable} ${interTight.variable}`}
    >
      <body className={interTight.className}>
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}