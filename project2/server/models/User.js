const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },

    specialization: String,

    // ✅ NEW FIELDS
    about: String,
    image: String,

    approved: { type: Boolean, default: false },

    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
