const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add("blogtest", "/blog", "test");
routes.add("blog", "/blog/:samples");
routes.add("postedit", "/blog/:samples/edit", "post-edit");
// routes.add("about", "/about-us/:foo(bar|baz)");
