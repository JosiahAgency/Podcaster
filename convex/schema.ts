import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    podcasts: defineTable({
        audioStorageId: v.optional(v.id('_storage')),
        user: v.id('users'),
        podcastTitle: v.string(),
        podcastDescription: v.string(),
        audioURL: v.optional(v.string()),
        imageStorageId: v.optional(v.id('_storage')),
        imgURL: v.optional(v.string()),
        author: v.string(),
        authorID: v.string(),
        authorImageURL: v.string(),
        voicePrompt: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        audioDuration: v.number(),
        views: v.number(),
    })
        .searchIndex('search_author', { searchField: 'author' })
        .searchIndex('search_title', { searchField: 'podcastTitle' })
        .searchIndex('search_description', { searchField: 'podcastDescription' }),

    users: defineTable({
        email: v.string(),
        imageURL: v.string(),
        clerkID: v.string(),
        name: v.string(),
    }),
})