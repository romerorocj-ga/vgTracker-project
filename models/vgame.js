const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const vgameSchema = new Schema(
  {
    title: { type: String, required: true },
    system: String, // New field for System
    price: Number, // New field for Price
    releaseYear: {
      type: Number,
      default: function () {
        return new Date().getFullYear();
      },
      min: 2000,
    },
    esrbRating: {
      type: String,
      enum: ["E", "T", "M"],
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vgame", vgameSchema);
