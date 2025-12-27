import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
      default: "INR",
    },

    frequency: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Entertainment",
        "Education",
        "Fitness",
        "Finance",
        "Utilities",
        "Other",
      ],
      default: "Other",
    },

    paymentMethod: {
      type: String,
      enum: ["card", "upi", "netbanking", "cash", "other"],
      default: "card",
    },

    status: {
      type: String,
      enum: ["active", "cancelled"],
      default: "active",
    },

    // Subscription start date
    startDate: {
      type: Date,
      required: true,
    },

    renewalDate: {
      type: Date,
      
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;