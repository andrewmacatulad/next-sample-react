// const withCss = require("@zeit/next-css");
// const withOffline = require("next-offline");
// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

// module.exports = withCss({
//   webpack(config) {
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

//     config.plugins.push(
//       new SWPrecacheWebpackPlugin({
//         verbose: true,
//         staticFileGlobsIgnorePatterns: [/\.next\//],
//         runtimeCaching: [
//           {
//             handler: "networkFirst",
//             urlPattern: /^https?.*/
//           }
//         ]
//       })
//     );

//     return config;
//   }
// });

const withCss = require("@zeit/next-css");
const withOffline = require("next-offline");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const withManifest = require("next-manifest");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

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
                src: path.resolve("static/favicon.ico"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: "/static"
              }
            ],
            includeDirectory: true,
            publicPath: ".."
          })
        );
      }
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
// const NextWorkboxPlugin = require("next-workbox-webpack-plugin");
// const WebpackPwaManifest = require("webpack-pwa-manifest");
// const path = require("path");

// module.exports = withCss({
//   webpack(config, { isServer, buildId, dev }) {
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

//     const workboxOptions = {
//       clientsClaim: true,
//       skipWaiting: true,
//       // globPatterns: [".next/static/*", ".next/static/commons/*"],
//       modifyUrlPrefix: {
//         ".next": "/_next"
//       },
//       runtimeCaching: [
//         {
//           urlPattern: "/",
//           handler: "networkFirst",
//           options: {
//             cacheName: "html-cache"
//           }
//         },
//         {
//           urlPattern: /[^3]\/blog\//,
//           handler: "networkFirst",
//           options: {
//             cacheName: "html-cache"
//           }
//         },
//         {
//           urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
//           handler: "cacheFirst",
//           options: {
//             cacheName: "image-cache",
//             cacheableResponse: {
//               statuses: [0, 200]
//             }
//           }
//         }
//       ]
//     };

//     if (!isServer && !dev) {
//       config.plugins.push(
//         new NextWorkboxPlugin({
//           buildId,
//           ...workboxOptions
//         }),
//         new WebpackPwaManifest({
//           filename: "static/manifest.json",
//           name: "Next PWA",
//           short_name: "Next-PWA",
//           description: "A Movie browsing PWA using Next.js and Google Workbox",
//           background_color: "#ffffff",
//           theme_color: "#5755d9",
//           display: "standalone",
//           orientation: "portrait",
//           fingerprints: false,
//           inject: false,
//           start_url: "/",
//           ios: {
//             "apple-mobile-web-app-title": "Next-PWA",
//             "apple-mobile-web-app-status-bar-style": "#5755d9"
//           },
//           icons: [
//             {
//               src: path.resolve("static/favicon.ico"),
//               sizes: [96, 128, 192, 256, 384, 512],
//               destination: "/static"
//             }
//           ],
//           includeDirectory: true,
//           publicPath: ".."
//         })
//       );
//     }

//     return config;
//   }
// });
