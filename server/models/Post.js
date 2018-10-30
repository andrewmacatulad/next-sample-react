const MongoPaging = require("mongo-cursor-pagination");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  postTitle: {
    type: String,
    required: true
  },
  postDescription: {
    type: String
  },
  postDownloadLinks: {
    type: String
  },
  postImageUrl: {
    type: String
  },
  postCategory: {
    type: Schema.Types.ObjectId,
    ref: "category"
  },
  postTags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tags"
    }
  ],
  postHdDownloadLinks: { type: String },
  postStreamLinks: { type: String },
  postSubsLinks: { type: String },
  postSubtitle: { type: String },
  postSlug: {
    type: String
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      }
    }
  ],
  updatedDate: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  }
});

PostSchema.plugin(MongoPaging.mongoosePlugin);

const Post = mongoose.model("posts", PostSchema);
module.exports = Post;
