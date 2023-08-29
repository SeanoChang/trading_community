import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  // Get all users
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),

  // Get user by id or username
  getCurrentUser: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
          email: input.email,
        },
      });
    }),
});
