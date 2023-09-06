"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Index from "./Index";

const page = () => {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Index />
      </QueryClientProvider>
    </div>
  );
};

export default page;
