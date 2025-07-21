import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const sendMessage = mutation({
  args: {
    userId: v.id("users"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // Optionally, you could validate user existence here
    const messageId = await ctx.db.insert("messages", {
      user: args.userId,
      body: args.content,
    });
    return messageId;
  },
});
