import mongoose, { type InferSchemaType, type Model } from "mongoose";

const orderLineSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    /** Snapshot unit price in paise at checkout */
    unitPricePaise: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    imageUrl: { type: String },
  },
  { _id: false },
);

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    line1: { type: String, required: true, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, default: "IN", trim: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: {
      type: [orderLineSchema],
      validate: [(v: unknown[]) => Array.isArray(v) && v.length > 0, "Order needs at least one line"],
    },
    /** Total charged in paise (items + tax/shipping when you add them) */
    amountTotalPaise: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },
    status: {
      type: String,
      enum: [
        "pending_payment",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
        "failed",
      ] as const,
      default: "pending_payment",
      index: true,
    },
    razorpayOrderId: { type: String, index: true, sparse: true },
    razorpayPaymentId: { type: String, sparse: true },
    razorpaySignature: { type: String, select: false },
    shippingAddress: shippingAddressSchema,
  },
  { timestamps: true },
);

orderSchema.index({ createdAt: -1 });

export type OrderAttrs = InferSchemaType<typeof orderSchema>;
export type OrderDocument = mongoose.HydratedDocument<OrderAttrs>;
export type OrderModel = Model<OrderAttrs>;

export const Order: OrderModel =
  (mongoose.models.Order as OrderModel | undefined) ??
  mongoose.model<OrderAttrs>("Order", orderSchema);
