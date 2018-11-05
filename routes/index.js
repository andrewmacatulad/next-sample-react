const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add("post", "/post", "test");
routes.add("posts", "/posts", "posts");
routes.add("category", "/category", "category");

// List All Post in a category
routes.add("download/post-list", "/download/:categ");
// Route for the post
routes.add("download", "/download/:categ/:posttitle");

// Add Edit Post
routes.add("postAdd", "/admin/post-add", "admin/post-add");
routes.add("postedit", "/admin/:posttitle/edit", "admin/post-edit");

// Add Edit Category
routes.add("categoryAdd", "/admin/category-add", "admin/category-add");

routes.add("admin", "/admin", "admin/index");
