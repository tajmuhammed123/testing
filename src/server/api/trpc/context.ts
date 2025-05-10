import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Database } from "~/app/types/database";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  // Create the Supabase client using the async cookies() function correctly
  const cookieStore = await cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: async () => await cookies(),
  });

  // Get session and user data
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    session,
    user,
    supabase,
    headers: opts.req.headers,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
