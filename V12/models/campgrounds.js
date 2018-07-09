var mongoose = require("mongoose");

//Campground Schema Set Up

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    cost: Number,
    createdAt: { type: Date, default: Date.now },
    author: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
    },
    comments: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
          }
        ]
});

module.exports = mongoose.model("Campground", campgroundSchema);