import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase
        .from('posts')
        .insert({
          name: input.name,
          created_by: ctx.session.user.id
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase
      .from('posts')
      .select('*')
      .eq('created_by', ctx.session.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});