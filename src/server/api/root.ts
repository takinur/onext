import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { predatorRouter } from "~/server/api/routers/predator";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  predator: predatorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
