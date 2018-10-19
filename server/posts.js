const posts = () => {
  const arrayOfPosts = [];
  const n = 5;

  for (let i = 1; i < n + 1; i += 1) {
    arrayOfPosts.push({ name: `Post ${i}`, slug: `post-${i}` });
  }
  return arrayOfPosts;
};

module.exports = posts;

// const Post = require("./models/Post");

// const posts = async () => {
//   const post = await Post.find({})
//     .populate("postCategory")
//     .exec();
//   const arrayOfPosts = [];
//   const n = post.length;

//   for (let i = 1; i < n + 1; i += 1) {
//     arrayOfPosts.push({ name: `Post ${i}`, slug: `sample-${i}` });
//   }
//   return arrayOfPosts;
//   // const urls = products.map({path} => `/products/${path})
//   // sitemapData = sitemap.createSitemap ({
//   //     hostname: 'http://example.com',
//   //     cacheTime: 600000,        // 600 sec - cache purge period
//   //     urls
//   // });
// };

// module.exports = posts;
