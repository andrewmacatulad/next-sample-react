const slug = require("slug");
const moment = require("moment");
const MongoPaging = require("mongo-cursor-pagination");
const mongoist = require("mongoist");

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

    const categorySlug = slug(name, { lower: true });

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

  app.get("/api/featured-posts/:categ", async (req, res) => {
    const { categ } = req.params;
    try {
      const posts = await Post.find({
        postCategory: categ
      })
        .limit(5)
        .sort("-date")
        .populate("postCategory")
        .exec();
      res.send(posts);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await Post.find({})
        .populate("postCategory")
        .exec();
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
    const cat = await Category.find({ slug: catSlug });

    if (cat.length === 0) {
      return res.status(404).send([]);
    }

    const post = await Post.find({ postCategory: cat[0]._id })
      .populate("postCategory")
      .exec();
    console.log(post.length);
    res.send(post);
  });

  app.get("/api/pagination", async (req, res) => {
    // const post = await Post.paginate({
    //   paginatedField: "postTitle",
    //   limit: 3
    // });

    // console.log(post.results);
    // res.json(post);

    let post = await Post.paginate({
      paginatedField: "postTitle",
      limit: 2
    });

    if (req.query.next) {
      post = await Post.paginate({
        paginatedField: "postTitle",
        limit: 2,
        next: req.query.next
      });
    }

    res.json(post);

    // let post = await Post.paginate({
    //   paginatedField: "postTitle",
    //   limit: 2
    // });

    // console.log("Post ", post);
    // if (req.query.next) {
    //   post = await Post.paginate({
    //     paginatedField: "postTitle",
    //     limit: 2,
    //     next: post.next
    //   });
    // }

    // console.log("Next Post", post);
    // res.json(post);

    // Mongodb plugin
    // const db = mongoist("mongodb://localhost:27017/next-project-site");
    // let post = await MongoPaging.find(db.collection("posts"), { limit: 2 });

    // if (req.query.next) {
    //   post = await MongoPaging.find(db.collection("posts"), {
    //     limit: 2,
    //     next: req.query.next
    //   });
    // }
    // res.json(post);

    // post = MongoPaging.find(db.collection('myobjects'), {
    //   limit: 2,
    //   next: result.next // This queries the next page
    // });

    // const { skip, limit, page } = req.query;
    // const { page } = req.query;

    // const d = moment(Date.now()).subtract(2, "days");

    // const limit = 3;
    // console.log(Date.now());
    // console.log(moment(Date.now()).subtract(5, "days"));
    // try {
    //   const post = await Post.find({ date: { $lte: d } })
    //     .skip((parseInt(page) - 1) * parseInt(limit))
    //     .limit(parseInt(limit))
    //     .sort("-date");

    //   if (post.length === 0) {
    //     return res.json({ results: [], next: false });
    //   }
    //   res.json({ results: post, page: parseInt(page), next: true });
    // } catch (err) {
    //   throw err;
    // }

    // try {
    //   // const posts = await Post.find({ _id: { $lt: req.query.next } })

    //   if (!req.query.next) {
    //     const posts = await Post.find()
    //       .sort({
    //         _id: -1
    //       })
    //       .limit(2);
    //     console.log("Next Posts ", posts[posts.length - 1]);
    //     const nextPost = posts[posts.length - 1]._id;
    //     return res.json({ posts, nextPost });
    //   } else if (req.query.next) {
    //     const posts = await Post.find({ _id: { $lt: req.query.next } })
    //       .sort({
    //         _id: -1
    //       })
    //       .limit(2);

    //     console.log("Next Posts ", posts[posts.length - 1]);
    //     const nextPost = posts[posts.length - 1]._id;
    //     return res.json({ posts, nextPost });
    //   }

    //   // if (post.length === 0) {
    //   //   return res.json({ results: [], next: false });
    //   // }
    //   // res.json({ results: post, page: parseInt(page), next: true });
    // } catch (err) {
    //   throw err;
    // }

    // console.log(offset, limit);
    // const post = await Post.find()
    //   .select("postTitle")
    //   .limit(limit)
    //   .skip(offset)
    //   .exec();

    // const post = await Post.find(
    //   {},
    //   {},
    //   { skip: parseInt(skip), limit: parseInt(limit) },
    //   function(err, docs) {
    //     if (!err) {
    //       res.json({ users: docs, next: 0 });
    //     } else {
    //       throw err;
    //     }
    //   }
    // );

    // try {
    //   const post = await Post.find(
    //     {},
    //     {},
    //     { skip: (parseInt(page) - 1) * parseInt(limit), limit: parseInt(limit) }
    //   );

    //   if (post.length === 0) {
    //     return res.json({ results: [], next: false });
    //   }
    //   res.json({ results: post, page: parseInt(page), next: true });
    // } catch (err) {
    //   throw err;
    // }
  });

  app.get("/sample/pagination", async (req, res) => {
    if (!req.query.next) {
      const posts = await Post.find()
        .sort({
          _id: -1
        })
        .limit(2);
      console.log("Next Posts ", posts[posts.length - 1]);
      const nextPost = posts[posts.length - 1]._id;
    } else if (req.query.next) {
      const posts = await Post.find({ _id: { $lt: req.query.next } })
        .sort({
          _id: -1
        })
        .limit(2);

      console.log("Next Posts ", posts[posts.length - 1]);
      const nextPost = posts[posts.length - 1]._id;
    }

    return res.json({ posts, nextPost });
  });
  // app.get("/sample", (req, res) => {
  //   console.log(slug("Test lan zxxc D ada123 zcx. ? @! as", { lower: true }));
  //   res.send(slug("Test lan zxxc D ada123 zcx. ? @! as", { lower: true }));
  // });
};
