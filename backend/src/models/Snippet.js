const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
        },
     tags: [String],
    code: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

// Text Index for Search 
snippetSchema.index({
     title: "text",
  description: "text",
  tags: "text",
  code: "text",
})
module.exports = mongoose.Model("Snippet",snippetSchema);