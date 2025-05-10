// src/server/api/trpc/trpc.ts
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import type { Context } from './context';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

// export const createTRPCContext = async (opts: { headers: Headers }) => {
//   const supabase = createServerComponentClient({ cookies: () => cookies() });
//   const { data: { session } } = await supabase.auth.getSession();

//   return {
//     session,
//     supabase,
//     headers: opts.headers,
//   };
// };

export const {
  router,
  procedure: publicProcedure,
  middleware,
  mergeRouters,
} = t;

export const createTRPCRouter = t.router;

const isAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
export type TrpcInstance = typeof t;