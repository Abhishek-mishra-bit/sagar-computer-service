import mongoose, { type InferSchemaType, type Model } from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    serviceTitle: {
      type: String,
      required: true,
      trim: true,
    },
    serviceCategory: {
      type: String,
      trim: true,
      index: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
      index: true,
    },
    durationMinutes: {
      type: Number,
      min: 15,
      default: 60,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "no_show",
      ] as const,
      default: "pending",
      index: true,
    },
    notes: {
      type: String,
      default: "",
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true,
    },
    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    /** Optional link to an order if booking was paid via checkout */
    relatedOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      sparse: true,
    },
  },
  { timestamps: true },
);

bookingSchema.index({ userId: 1, scheduledAt: -1 });

export type BookingAttrs = InferSchemaType<typeof bookingSchema>;
export type BookingDocument = mongoose.HydratedDocument<BookingAttrs>;
export type BookingModel = Model<BookingAttrs>;

export const Booking: BookingModel =
  (mongoose.models.Booking as BookingModel | undefined) ??
  mongoose.model<BookingAttrs>("Booking", bookingSchema);
