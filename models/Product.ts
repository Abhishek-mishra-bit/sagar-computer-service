import mongoose, { type InferSchemaType, type Model } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
    },
    /** Price in paise (INR × 100) — aligns with Razorpay integer amounts */
    pricePaise: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    sku: {
      type: String,
      trim: true,
      sparse: true,
      unique: true,
    },
    category: {
      type: String,
      trim: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true },
);

export type ProductAttrs = InferSchemaType<typeof productSchema>;
export type ProductDocument = mongoose.HydratedDocument<ProductAttrs>;
export type ProductModel = Model<ProductAttrs>;

export const Product: ProductModel =
  (mongoose.models.Product as ProductModel | undefined) ??
  mongoose.model<ProductAttrs>("Product", productSchema);
