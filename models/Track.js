const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);


const Track = mongoose.model('Track', trackSchema)
module.exports = Track