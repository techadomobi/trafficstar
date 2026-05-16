import "./globals.css";

export const metadata = {
  title: "All-in-One Growth Platform for Mobile Apps & Games | Trackstart DSP",
  description:
    "Boost your app or game's success with Trackstart. Discover powerful tools for user acquisition, monetization, and performance analytics all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
