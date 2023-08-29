import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const followingRouter = createTRPCRouter({
  // Get all following for a user using Id
  getUserFollowingsById: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.following.findMany({
        where: {
          userId: input.id,
        },
      });
    }),
  
  // get all following for a user using email
  getUserFollowingsByEmail: publicProcedure
    .input(
      z.object({
        email: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.following.findMany({
        where: {
          userEmail: input.email,
        },
      });
    }),
});
