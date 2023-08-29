import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const followersRouter = createTRPCRouter({
  // Get all followers for a user using id
  getUserFollowersById: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.follower.findMany({
        where: {
          userId: input.id,
        },
      });
    }),

  // Get all followers for a user using email
  getUserFollowersByEmail: publicProcedure
    .input(
      z.object({
        email: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.follower.findMany({
        where: {
          userEmail: input.email,
        },
      });
    })
});
