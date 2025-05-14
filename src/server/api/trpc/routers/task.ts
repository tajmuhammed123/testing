import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const taskRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        assigned_to: z.string(),
        deadline: z.date().optional().nullable(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
        status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
        tags: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error("Unauthorized: No user ID in session");

      const { data, error } = await ctx.supabase
        .from("tasks")
        .insert({
          ...input,
          created_by: userId,
          deadline: input.deadline ? input.deadline.toISOString() : null,
          tags: input.tags ?? [],
        })
        .select("*, assignee:assigned_to(*), creator:created_by(*)")
        .single();

      if (error) throw new Error(error.message);
      return data;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) throw new Error("Unauthorized");

    const { data, error } = await ctx.supabase
      .from("tasks")
      .select("*, assignee:assigned_to(*), creator:created_by(*)")
      .or(`assigned_to.eq.${userId},created_by.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          title: z.string().min(1).optional(),
          description: z.string().optional(),
          assigned_to: z.string().optional(),
          deadline: z.date().optional().nullable(),
          priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
          status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
          tags: z.array(z.string()).optional(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, data: updateData } = input;

      const { data, error } = await ctx.supabase
        .from("tasks")
        .update({
          ...updateData,
          deadline: updateData.deadline
            ? updateData.deadline.toISOString()
            : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select("*, assignee:assigned_to(*), creator:created_by(*)")
        .single();

      if (error) throw new Error(error.message);
      return data;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error("Unauthorized");

      const { error } = await ctx.supabase
        .from("tasks")
        .delete()
        .eq("id", input.id)
        .eq("created_by", userId);

      if (error) throw new Error(error.message);
      return { success: true };
    }),
});