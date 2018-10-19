const sm = require("sitemap");
const path = require("path");
const Post = require("./models/Post");
const posts = require("./posts");

const sitemap = sm.createSitemap({
  hostname: "http://localhost:3000",
  cacheTime: 600000 // 600 sec - cache purge period
});

const setup = async ({ server }) => {
  // const posts = await Post.find({})
  // .populate("postCategory")
  // .exec();

  const Posts = posts();
  for (let i = 0; i < Posts.length; i += 1) {
    const post = Posts[i];
    sitemap.add({
      url: `/posts/${post.slug}`,
      changefreq: "daily",
      priority: 0.9
    });
  }

  sitemap.add({
    url: "/a",
    changefreq: "daily",
    priority: 1
  });

  sitemap.add({
    url: "/b",
    changefreq: "daily",
    priority: 1
  });

  server.get("/sitemap.xml", async (req, res) => {
    const posts = await Post.find({})
      .populate("postCategory")
      .exec();
    posts.map(post => {
      sitemap.urls.push({
        url: `/download/${post.postCategory.slug}/${post.postSlug}`,
        changefreq: "daily",
        priority: 0.3
      });
    });
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.header("Content-Type", "application/xml");
      res.send(xml);
    });
  });

  server.get("/robots.txt", (req, res) => {
    res.sendFile(path.join(__dirname, "../static", "robots.txt"));
  });
};

module.exports = setup;

// const sm = require("sitemap");
// const path = require("path");
// const Post = require("./models/Post");
// const posts = require("./posts");

// const sitemap = sm.createSitemap({
//   hostname: "https://sitemap-robots.now.sh",
//   cacheTime: 600000 // 600 sec - cache purge period
// });

// const setup = async ({ server }) => {
//   const posts = await Post.find({})
//     .populate("postCategory")
//     .exec();

//   console.log(posts[0].postCategory.slug);
//   // posts.map(post => {
//   //   sitemap.add({
//   //     url: `/download/${post.postCategory.slug}/${post.postSlug}}`,
//   //     changefreq: "daily",
//   //     priority: 0.9
//   //   });
//   // });

//   // for (let i = 0; i < posts.length; i += 1) {
//   //   const post = posts[i];
//   //   sitemap.add({
//   //     url: `/download/${post.postCategory.slug}`,
//   //     changefreq: "daily",
//   //     priority: 0.9
//   //   });
//   // }

//   sitemap.add({
//     url: "/a",
//     changefreq: "daily",
//     priority: 1
//   });

//   sitemap.add({
//     url: "/b",
//     changefreq: "daily",
//     priority: 1
//   });

//   server.get("/sitemap.xml", (req, res) => {
//     sitemap.toXML((err, xml) => {
//       if (err) {
//         res.status(500).end();
//         return;
//       }

//       res.header("Content-Type", "application/xml");
//       res.send(xml);
//     });
//   });

//   server.get("/robots.txt", (req, res) => {
//     res.sendFile(path.join(__dirname, "../static", "robots.txt"));
//   });
// };

// module.exports = setup;

// const sm = require("sitemap");
// const path = require("path");
// const Post = require("./models/Post");
// const posts = require("./posts");

// const sitemap = sm.createSitemap({
//   hostname: "https://sitemap-robots.now.sh",
//   cacheTime: 600000 // 600 sec - cache purge period
// });

// const setup = async ({ server }) => {
//   // const posts = await Post.find({})
//   // .populate("postCategory")
//   // .exec();

//   const Posts = posts();
//   for (let i = 0; i < Posts.length; i += 1) {
//     const post = Posts[i];
//     sitemap.add({
//       url: `/posts/${post.slug}`,
//       changefreq: "daily",
//       priority: 0.9
//     });
//   }

//   sitemap.add({
//     url: "/a",
//     changefreq: "daily",
//     priority: 1
//   });

//   sitemap.add({
//     url: "/b",
//     changefreq: "daily",
//     priority: 1
//   });

//   server.get("/sitemap.xml", (req, res) => {
//     sitemap.toXML((err, xml) => {
//       if (err) {
//         res.status(500).end();
//         return;
//       }

//       res.header("Content-Type", "application/xml");
//       res.send(xml);
//     });
//   });

//   server.get("/robots.txt", (req, res) => {
//     res.sendFile(path.join(__dirname, "../static", "robots.txt"));
//   });
// };

// module.exports = setup;
