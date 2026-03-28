import mongoose, { type InferSchemaType, type Model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"] as const,
      default: "customer",
      index: true,
    },
  },
  { timestamps: true },
);

export type UserAttrs = InferSchemaType<typeof userSchema>;
export type UserDocument = mongoose.HydratedDocument<UserAttrs>;
export type UserModel = Model<UserAttrs>;

export const User: UserModel =
  (mongoose.models.User as UserModel | undefined) ??
  mongoose.model<UserAttrs>("User", userSchema);
