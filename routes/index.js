const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add("test", "/test");
routes.add("blog", "/blog/:samples");
routes.add("about", "/about-us/:foo(bar|baz)");
