require("dotenv").config();
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
const compression = require("compression");
const { join } = require("path");
const { parse } = require("url");

const sitemapAndRobots = require("./server/sitemapAndRobots");
const keys = require("./config/keys");

const routes = require("./routes");

require("./server/models/Post");
require("./server/models/Tags");
require("./server/models/Category");
require("./server/models/Level");
require("./server/models/User");
require("./server/passport/passport");

const Level = mongoose.model("levels");
const User = mongoose.model("users");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const ROOT_URL = dev
  ? `http://localhost:${port}`
  : "https://sitemap-robots.now.sh";

console.log(process.env.NODE_ENV);
console.log(process.env.MONGO_URI);
console.log(keys.mongoURI);

mongoose.connect(keys.mongoURI);

const app = next({ dev });

const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

// Nextjs's server prepared
app.prepare().then(() => {
  const server = express();
  if (!dev) {
    server.use(compression());
  }

  // server.use("/service-worker.js", (req, res) => {
  //   const parsedUrl = parse(req.url, true);
  //   const { pathname } = parsedUrl;
  //   const filePath = join(__dirname, ".next", pathname);
  //   app.serveStatic(req, res, filePath);
  // });

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
        url: keys.mongoURI
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
  require("./server/api/leveling")(server);
  require("./server/api/authRoutes")(server);
  require("./server/api/postRoutes")(server);
  require("./server/api/uploadRoutes")(server);

  sitemapAndRobots({ server });

  // server.get("*", (req, res) => {
  //   return handler(req, res);
  // });

  // server.get("*", (req, res) => {
  //   console.log("ReqURL ", req.url);
  //   if (req.url.includes("/sw")) {
  //     const filePath = join(__dirname, "static", "workbox", "sw.js");
  //     console.log("Filepath ", filePath);
  //     app.serveStatic(req, res, filePath);
  //   } else if (req.url.startsWith("static/workbox/")) {
  //     app.serveStatic(req, res, join(__dirname, req.url));
  //   } else {
  //     return handle(req, res, req.url);
  //     // handle(req, res, req.url);
  //   }
  // });

  server.get("*", (req, res) => {
    // console.log("ReqURL ", req.url);
    if (req.url.includes("/service-worker")) {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      const filePath = join(__dirname, ".next", pathname);

      // console.log("Path", filePath);
      app.serveStatic(req, res, filePath);
      // } else if (req.url.startsWith('static/workbox/')) {
      //   app.serveStatic(req, res, join(__dirname, req.url));
    } else {
      return handler(req, res, req.url);
      // handle(req, res, req.url);
    }
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
