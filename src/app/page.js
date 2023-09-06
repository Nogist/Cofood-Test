"use client";

import React from "react";
import Index from ".";
import { QueryClient, QueryClientProvider } from "react-query";

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
