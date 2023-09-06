"use client";

import "./globals.scss";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CoKitchen Workspace Limited",
  description: "Created by an employee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className="App">{children}</body>
      </QueryClientProvider>
    </html>
  );
}
