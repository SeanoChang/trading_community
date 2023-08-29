import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const channelsRouter = createTRPCRouter({
  // Get all channels
  getAllChannels: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.channel.findMany();
  }),

  // Get channel by id
  getChannelById: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.channel.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  // Search channels by name
  searchChannelsByName: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.channel.findMany({
        where: {
          name: input.name,
        },
      });
    }),

  // Get all channels for a user using id
  getUserChannelsById: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.channel.findMany({
        where: {
          userId: input.id,
        },
      });
    }),

    // create channel
    createChannel: protectedProcedure
    .input(
        z.object({
            name: z.string(),
            slug: z.string(),
            userId: z.string(),
        })
    )
    .mutation(async ({ input, ctx }) => {
        return await ctx.prisma.channel.create({
            data: {
                name: input.name,
                slug: input.slug,
                userId: input.userId,
            },
        });
    }),
});
