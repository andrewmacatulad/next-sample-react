const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add("post", "/post", "test");
routes.add("posts", "/posts", "posts");
routes.add("postsNew", "/post/new", "post/new");
// routes.add("postsEdit", "/post/edit", "post/edit");
routes.add("blogtest", "/blog", "test");
routes.add("blog", "/blog/:samples");
routes.add("postedit", "/blog/:samples/edit", "post/edit");

// routes.add("posttest", "/category/:categ/:posttitle");

routes.add("category", "/category", "category/index");
routes.add("category-add", "/category/add", "category/new");

routes.add("post-list", "/:categ");
routes.add("posttest", "/:categ/:posttitle");
