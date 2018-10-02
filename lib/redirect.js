import Router from "next/router";

export default (res, target) => {
  if (res) {
    // server
    // 303: "See other"
    res.writeHead(303, { Location: target });
    res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};

// import React from 'react'
// import Router from 'next/router'

// export default class extends React.Component {
//   static async getInitialProps({ res }) {
//     if (res) {
//       res.writeHead(302, {
//         Location: 'http://example.com'
//       })
//       res.end()
//     } else {
//       Router.push('http://example.com')
//     }
//     return {}
//   }
// }
