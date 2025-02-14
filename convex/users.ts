import { ConvexError, v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

export const getUserById = query({
    args: {
        clerkId: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkID"), args.clerkId))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        return user;
    },
});

export const createUser = internalMutation({
    args: {
        clerkID: v.string(),
        email: v.string(),
        imageURL: v.string(),
        name: v.string(),
    }, handler: async (ctx, args) => {
        await ctx.db.insert('users', {
            clerkID: args.clerkID,
            email: args.email,
            imageURL: args.imageURL,
            name: args.name,
        })
    }
});

export const updateUser = internalMutation({
    args: {
        clerkID: v.string(),
        imageURL: v.string(),
        email: v.string(),
    }, async handler(ctx, args) {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkID"), args.clerkID))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        await ctx.db.patch(user._id, {
            imageURL: args.imageURL,
            email: args.email,
        });

        const podcast = await ctx.db
            .query("podcasts")
            .filter((q) => q.eq(q.field("authorID"), args.clerkID))
            .collect();

        await Promise.all(
            podcast.map(async (p) => {
                await ctx.db.patch(p._id, {
                    authorImageURL: args.imageURL,
                });
            })
        );
    },
});

export const deleteUser = internalMutation({
    args: {
        clerkID: v.string(),
    }, async handler(ctx, args) {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("clerkID"), args.clerkID))
            .unique();

        if (!user) {
            throw new ConvexError("User not found");
        }

        await ctx.db.delete(user._id);
    },
});

export const getTopUserByPodcastCount = query({
    args: {},
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").collect();

        const userData = await Promise.all(
            user.map(async (u) => {
                const podcasts = await ctx.db
                    .query("podcasts")
                    .filter((q) => q.eq(q.field("authorID"), u.clerkID))
                    .collect();

                const sortedPodcasts = podcasts.sort((a, b) => b.views - a.views);

                return {
                    ...u,
                    totalPodcasts: podcasts.length,
                    podcast: sortedPodcasts.map((p) => ({
                        podcastTitle: p.podcastTitle,
                        pocastId: p._id,
                    })),
                };
            })
        );

        return userData.sort((a, b) => b.totalPodcasts - a.totalPodcasts);
    },
});

