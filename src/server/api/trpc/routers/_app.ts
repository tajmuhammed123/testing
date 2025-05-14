import { router } from '../trpc'
import { taskRouter } from './task'
import { userRouter } from './user'

export const appRouter = router({
  task: taskRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter