// src/trpc/server.ts
import "server-only";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { appRouter, type AppRouter } from "~/server/api/root";
import { headers as nextHeaders, cookies } from "next/headers";
import { createQueryClient } from "./query-client";
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "~/app/types/database";

const createContext = cache(async () => {

  const cookieStore = cookies();

  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user) {
    throw new Error("No authenticated user found");
  }

  const headersList = await nextHeaders();
  const headers = new Headers();

  headersList.forEach((value, key) => {
    headers.append(key, value);
  });

  return {
    user,
    session,
    supabase,
    headers,
  };
});

const getQueryClient = cache(createQueryClient);

export const createCaller = async () => {
  const context = await createContext();
  const caller = appRouter.createCaller(context);
  return caller;
};

export const getHydrationHelpers = async () => {
  const caller = await createCaller();
  return createHydrationHelpers<AppRouter>(caller, getQueryClient);
};
