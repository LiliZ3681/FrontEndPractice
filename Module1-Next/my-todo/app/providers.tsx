// TanStack Query needs client-side state:
// So the provider file needs:
// "use client";
// But your layout.tsx is a Server Component by default.
// If you put "use client" at the top of layout.tsx,
// then the whole root layout becomes client-side,
// which is usually not ideal.

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
