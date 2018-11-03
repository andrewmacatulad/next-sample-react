// const withCss = require("@zeit/next-css");
// const withOffline = require("next-offline");
// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
// const withManifest = require("next-manifest");
// const WebpackPwaManifest = require("webpack-pwa-manifest");
// const path = require("path");
// require("dotenv").config();
// const Dotenv = require("dotenv-webpack");

// module.exports = withOffline(
//   withCss({
//     webpack(config, { isServer, dev }) {
//       config.module.rules.push({
//         test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
//         use: {
//           loader: "url-loader",
//           options: {
//             limit: 100000,
//             publicPath: "./",
//             outputPath: "static/",
//             name: "[name].[ext]"
//           }
//         }
//       });

//       // config.plugins.push(
//       //   new SWPrecacheWebpackPlugin({
//       //     verbose: true,
//       //     staticFileGlobsIgnorePatterns: [/\.next\//],
//       //     runtimeCaching: [
//       //       {
//       //         handler: "networkFirst",
//       //         urlPattern: /^https?.*/
//       //       }
//       //     ]
//       //   })
//       // );
//       if (!isServer && !dev) {
//         config.plugins.push(
//           new WebpackPwaManifest({
//             filename: "static/manifest.json",
//             name: "Next PWA",
//             short_name: "Next-PWA",
//             description:
//               "A Movie browsing PWA using Next.js and Google Workbox",
//             background_color: "#ffffff",
//             theme_color: "#5755d9",
//             display: "standalone",
//             orientation: "portrait",
//             fingerprints: false,
//             inject: false,
//             start_url: "/",
//             ios: {
//               "apple-mobile-web-app-title": "Next-PWA",
//               "apple-mobile-web-app-status-bar-style": "#5755d9"
//             },
//             icons: [
//               {
//                 src: path.resolve("static/favicon.ico"),
//                 sizes: [96, 128, 192, 256, 384, 512],
//                 destination: "/static"
//               }
//             ],
//             includeDirectory: true,
//             publicPath: ".."
//           })
//         );
//       }
//       config.plugins = [
//         ...config.plugins,

//         // Read the .env file
//         new Dotenv({
//           path: path.join(__dirname, ".env"),
//           systemvars: true
//         })
//       ];
//       return config;
//     }
//     // manifest: {
//     //   name: "NextJs Manifest",
//     //   short_name: "nextjsmanifest",
//     //   display: "standalone",
//     //   background_color: "#5bb6ff",
//     //   theme_color: "#ffc18e",
//     //   description: "Manifest built in Nextjs"
//     // }
//   })
// );

const withCss = require("@zeit/next-css");
const withOffline = require("next-offline");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const withManifest = require("next-manifest");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
require("dotenv").config();
const Dotenv = require("dotenv-webpack");

module.exports = withOffline(
  withCss({
    webpack(config, { isServer, dev }) {
      config.module.rules.push({
        test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
            publicPath: "./",
            outputPath: "static/",
            name: "[name].[ext]"
          }
        }
      });
      workboxOpts: {
        runtimeCaching: [
          {
            urlPattern: /.png$/,
            handler: "cacheFirst"
          },
          {
            urlPattern: /api/,
            handler: "networkFirst",
            options: {
              cacheableResponse: {
                statuses: [0, 200],
                headers: {
                  "x-test": "true"
                }
              }
            }
          }
        ];
      }
      // config.plugins.push(
      //   new SWPrecacheWebpackPlugin({
      //     verbose: true,
      //     staticFileGlobsIgnorePatterns: [/\.next\//],
      //     runtimeCaching: [
      //       {
      //         handler: "networkFirst",
      //         urlPattern: /^https?.*/
      //       }
      //     ]
      //   })
      // );
      if (!isServer && !dev) {
        config.plugins.push(
          new WebpackPwaManifest({
            filename: "static/manifest.json",
            name: "Next PWA",
            short_name: "Next-PWA",
            description:
              "A Movie browsing PWA using Next.js and Google Workbox",
            background_color: "#ffffff",
            theme_color: "#5755d9",
            display: "standalone",
            orientation: "portrait",
            fingerprints: false,
            inject: false,
            start_url: "/",
            ios: {
              "apple-mobile-web-app-title": "Next-PWA",
              "apple-mobile-web-app-status-bar-style": "#5755d9"
            },
            icons: [
              {
                src: path.resolve("static/1.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: "/static"
              }
            ],
            includeDirectory: true,
            publicPath: ".."
          })
        );
      }

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, ".env"),
          systemvars: true
        })
      ];
      return config;
    }
    // manifest: {
    //   name: "NextJs Manifest",
    //   short_name: "nextjsmanifest",
    //   display: "standalone",
    //   background_color: "#5bb6ff",
    //   theme_color: "#ffc18e",
    //   description: "Manifest built in Nextjs"
    // }
  })
);

// const withCss = require("@zeit/next-css");

// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

// const path = require("path");
// require("dotenv").config();
// const Dotenv = require("dotenv-webpack");

// module.exports = withCss({
//   webpack: (config, { dev }) => {
//     config.module.rules.push({
//       test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
//       use: {
//         loader: "url-loader",
//         options: {
//           limit: 100000,
//           publicPath: "./",
//           outputPath: "static/",
//           name: "[name].[ext]"
//         }
//       }
//     });

//     // config.entry = () =>
//     //   oldEntry().then(entry => {
//     //     entry["server.js"].push(path.resolve("./utils/offline"));
//     //     return entry;
//     //   });
//     // const configEntry = config.entry;
//     // config.entry = async () => {
//     //   const entry = await configEntry();
//     //   entry["main.js"].push("test");
//     //   return entry;
//     // };
//     const oldEntry = config.entry;

//     config.entry = () =>
//       oldEntry().then(entry => {
//         entry["main.js"] &&
//           entry["main.js"].push(path.resolve("./utils/offline"));
//         return entry;
//       });
//     if (!dev) {
//       config.plugins.push(
//         new SWPrecacheWebpackPlugin({
//           cacheId: "test-lighthouse",
//           filepath: path.resolve("./static/sw.js"),
//           staticFileGlobs: ["static/**/*"],
//           minify: true,
//           staticFileGlobsIgnorePatterns: [/\.next\//],
//           runtimeCaching: [
//             {
//               handler: "fastest",
//               urlPattern: /[.](png|jpg|css)/
//             },
//             {
//               handler: "networkFirst",
//               urlPattern: /^http.*/
//             }
//           ]
//         })
//       );
//     }

//     config.plugins = [
//       ...config.plugins,

//       // Read the .env file
//       new Dotenv({
//         path: path.join(__dirname, ".env"),
//         systemvars: true
//       })
//     ];
//     return config;
//   }
// });
