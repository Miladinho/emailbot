require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Create Links That Prefills A New Email With Your Message To Your Representatives`,
    description: `This is a prototype application to allow for you to easily write email campagins for your elected representatives in the U.S. House Congress and U.S. Senate. We do not intend to keep any personal information everything is intended to be public and transparent. Please use this application at your own risk, we take no responsibility with how you use this.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY || "",
          authDomain: process.env.YOUR_FIREBASE_AUTH_DOMAIN || "",
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID || "",
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
          appId: process.env.YOUR_FIREBASE_APP_ID || ""
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
