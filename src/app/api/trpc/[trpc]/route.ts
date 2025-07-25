import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '~/server/api/root'
import { createContext } from '~/server/api/trpc/context'  // Add this import

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  })

export { handler as GET, handler as POST }