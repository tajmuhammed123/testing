// src/server/api/root.ts
import { postRouter } from "./trpc/routers/post";
import { taskRouter } from "./trpc/routers/task";
import { userRouter } from "./trpc/routers/user";
import { createTRPCRouter } from "./trpc/trpc";

export const appRouter = createTRPCRouter({
  task: taskRouter,
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;

// Create caller function directly from the router
export function createCaller() {
  return {
    task: taskRouter.createCaller,
    user: userRouter.createCaller,
    post: postRouter.createCaller,
  };
}