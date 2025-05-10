"use client";

import "../styles/globals.css";
import { useState, type ReactNode } from "react";
import { Navigation } from "./Navigation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { TRPCReactProvider } from "~/trpc/react"; // ✅ Import this

export default function RootLayout({ children }: { children: ReactNode }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <html lang="en">
      <body>
        <SessionContextProvider supabaseClient={supabaseClient}>
          <TRPCReactProvider>
            <Navigation />
            <main>{children}</main>
          </TRPCReactProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}