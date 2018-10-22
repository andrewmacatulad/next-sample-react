const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add("post", "/post", "test");
routes.add("posts", "/posts", "posts");
routes.add("postsNew", "/post/add", "post/add");
routes.add("postsEdit", "/post/edit", "post/edit");
routes.add("blogtest", "/blog", "test");
routes.add("blog", "/blog/:samples");
// routes.add("postedit", "/blog/:samples/edit", "post/edit");

// routes.add("posttest", "/category/:categ/:posttitle");

routes.add("category", "/category", "category");
routes.add("category-add", "/category/add", "category/new");

routes.add("download/post-list", "/download/:categ");
routes.add("download", "/download/:categ/:posttitle");
