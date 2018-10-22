const slug = require("slug");
const mongoose = require("mongoose");

const Category = mongoose.model("category");
const Tags = mongoose.model("tags");
const Post = mongoose.model("posts");

module.exports = app => {
  app.get("/api/category", async (req, res) => {
    try {
      const category = await Category.find({});
      res.send(category);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.post("/api/category", async (req, res) => {
    const { name } = req.body;

    console.log(name);

    const categorySlug = slug(name, { lower: true });

    console.log(categorySlug);
    const category = new Category({
      name,
      slug: categorySlug
    });

    try {
      await category.save();
      res.send(category);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.get("/api/tags", async (req, res) => {
    try {
      const tags = await Tags.find({});
      res.send(tags);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.post("/api/tags", async (req, res) => {
    const { name } = req.body;

    console.log(name);

    const tagsSlug = slug(name, { lower: true });

    const tags = new Tags({
      name,
      slug: tagsSlug
    });

    try {
      await tags.save();
      res.send(tags);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await Post.find({});
      res.send(posts);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.post("/api/post", async (req, res) => {
    const {
      user,
      postTitle,
      postDescription,
      postImageUrl,
      postCategory,
      postTags,
      postDownloadLinks,
      postHdDownloadLinks,
      postStreamLinks,
      postSubsLinks,
      postSubtitle
    } = req.body;

    // user
    // postTitle
    // postDescription
    // postImageUrl
    // postCategory
    // postTags
    // postSlug

    const postSlug = slug(postTitle, { lower: true });

    const post = new Post({
      user,
      postTitle,
      postDescription,
      postImageUrl,
      postCategory,
      postTags,
      postSlug,
      postDownloadLinks,
      postHdDownloadLinks,
      postStreamLinks,
      postSubsLinks,
      postSubtitle
    });

    try {
      await post.save();
      res.send(post);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.patch("/api/post", async (req, res) => {
    const {
      userId,
      postId,
      postTitle,
      postDescription,
      postCategory,
      postTags,
      postDownloadLinks
    } = req.body;
    const postSlug = slug(postTitle, { lower: true });

    const post = await Post.findByIdAndUpdate(
      { _id: postId, user: userId },
      {
        postTitle,
        postDescription,
        postCategory,
        postTags,
        postSlug,
        postDownloadLinks
      }
    ).exec();

    res.json(post);
  });

  app.get("/api/download/:catId/:postId", async (req, res) => {
    const { catId, postId } = req.params;

    // console.log(catId);

    const post = await Post.find({ postCategory: catId, _id: postId });

    res.send(post);
  });

  app.get("/api/download/:catSlug", async (req, res) => {
    const { catSlug } = req.params;
    console.log(catSlug);
    const cat = await Category.find({ slug: catSlug });

    if (cat.length === 0) {
      return res.status(404).send([]);
    }

    const post = await Post.find({ postCategory: cat[0]._id });
    console.log(post.length);
    res.send(post);
  });
  // app.get("/sample", (req, res) => {
  //   console.log(slug("Test lan zxxc D ada123 zcx. ? @! as", { lower: true }));
  //   res.send(slug("Test lan zxxc D ada123 zcx. ? @! as", { lower: true }));
  // });
};
