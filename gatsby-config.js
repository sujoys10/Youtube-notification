/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-youtube-v3`,
      options: {
        key: 'AIzaSyDPdlc3ctJ7yodRZE_GfbngNBEYbdcyys8',
        channelId:'UCdM4pTNXElGNqBOZbvxmzjg',
        //channelId:'UCNFmBuclxQPe57orKiQbyfA',
        //playlistId: 'PLzvhQUIpvvujXvcaIthycttSLChcP_rF2',
        part: 'snippet,contentDetails',
        maxResults: 25
        //fields: 'items(id,snippet(title,description,thumbnails),contentDetails)'
      }
    },
    
  ]
}
