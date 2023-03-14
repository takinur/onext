import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const predatorRouter = createTRPCRouter({
  postMessage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.predator.create({
          data: {
            name: input.name,
            message: input.message,
          },
        });
      } catch (err) {
        console.log(err);
        return false;
      }
    }),
  getMessages: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.predator.findMany({
        select: {
          name: true,
          message: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  }),
});
