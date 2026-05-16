import "./globals.css";

export const metadata = {
  title: "Northern Dreamscape",
  description: "Small-group expeditions to Gilgit-Baltistan"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
