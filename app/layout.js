import "./globals.css";
import ThemeProvider from "./ThemeProvider";

export const metadata = {
  title: "Mediora",
  description: "Healthcare authentication frontend for Mediora",
  icons: {
    icon: "/images/mediora_favicon.webp",
    shortcut: "/images/mediora_favicon.webp",
    apple: "/images/mediora_favicon.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
