import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const sendMessage = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user?.subject) {
      throw new Error("User not authenticated");
    }
    const messageId = await ctx.db.insert("messages", {
      user: user.subject,
      body: args.content,
    });
    return messageId;
  },
});
