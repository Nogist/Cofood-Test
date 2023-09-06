import "./globals.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CoKitchen Workspace Limited",
  description: "Created by an employee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="App">{children}</body>
    </html>
  );
}
