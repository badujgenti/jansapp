import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/shared/theme/theme";
import { ToastContainer } from "@/shared/components/ui/Toast";
import { ErrorBoundary } from "@/shared/components/layout/ErrorBoundary";
import { AuthProvider } from "./AuthProvider";
import "@/shared/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SafeAreaProvider>
          <ErrorBoundary>
            <AuthProvider>
              {children}
              <ToastContainer />
            </AuthProvider>
          </ErrorBoundary>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
