const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const slug = require("slug");
const sitemapAndRobots = require("./sitemapAndRobots");

const routes = require("../routes");

require("./models/Post");
require("./models/Tags");
require("./models/Category");
require("./models/Level");
require("./models/User");
require("./passport/passport");

const Level = mongoose.model("levels");
const User = mongoose.model("users");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const ROOT_URL = dev
  ? `http://localhost:${port}`
  : "https://sitemap-robots.now.sh";

console.log(ROOT_URL);

mongoose.connect("mongodb://localhost:27017/next-project-site");

const app = next({ dev });

//const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

// Nextjs's server prepared
app.prepare().then(() => {
  const server = express();

  // server.use(handler);
  //server.use(morgan("combined"));
  server.use(cors());
  server.use(bodyParser.json());

  server.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      },
      store: new MongoStore({
        url: "mongodb://localhost:27017/next-project-site"
      })
    })
  );
  // server.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", ROOT_URL);
  //   res.header("Access-Control-Allow-Credentials", true);
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   next();
  // });
  server.use(passport.initialize());
  server.use(passport.session());
  require("./api/leveling")(server);
  require("./api/authRoutes")(server);
  require("./api/postRoutes")(server);

  sitemapAndRobots({ server });

  server.get("*", (req, res) => {
    return handler(req, res);
  });

  // starting express server
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
  });
});

// const express = require("express");
// const next = require("next");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const session = require("express-session");
// const morgan = require("morgan");
// const passport = require("passport");
// const mongoose = require("mongoose");
// const MongoStore = require("connect-mongo")(session);
// const sitemapAndRobots = require("./sitemapAndRobots");

// const routes = require("../routes");
// const createStore = require("../store");

// require("./models/Level");
// require("./models/User");
// require("./passport/passport");

// const Level = mongoose.model("levels");
// const User = mongoose.model("users");

// const dev = process.env.NODE_ENV !== "production";
// const port = process.env.PORT || 3000;
// const ROOT_URL = dev
//   ? `http://localhost:${port}`
//   : "https://sitemap-robots.now.sh";

// console.log(ROOT_URL);

// mongoose.connect("mongodb://localhost:27017/next-project-site");

// const app = next({ dev });

// //const handle = app.getRequestHandler();
// const handler = routes.getRequestHandler(app);

// // Nextjs's server prepared
// app.prepare().then(() => {
//   const server = express();
//   // server.use(handler);
//   //server.use(morgan("combined"));
//   server.use(cors());
//   server.use(bodyParser.json());

//   server.use(
//     session({
//       secret: "keyboard cat",
//       resave: false,
//       saveUninitialized: false,
//       unset: "destroy",
//       cookie: {
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
//       },
//       store: new MongoStore({
//         url: "mongodb://localhost:27017/next-project-site"
//       })
//     })
//   );

//   server.use(passport.initialize());
//   server.use(passport.session());
//   require("./api/leveling")(server);
//   require("./api/authRoutes")(server);
//   sitemapAndRobots({ server });

//   server.get("*", (req, res) => {
//     const store = createStore(req);
//     handler(req, res);
//   });

//   // starting express server
//   server.listen(port, err => {
//     if (err) throw err;
//     console.log(`> Ready on ${ROOT_URL}`); // eslint-disable-line no-console
//   });
// });
