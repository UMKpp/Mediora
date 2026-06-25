import "./globals.css";

export const metadata = {
  title: "Mediora",
  description: "Healthcare authentication frontend for Mediora",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
