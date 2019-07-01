const path = require('path');

module.exports.createPages = async ({graphql, actions}) => {
    const { createPage } = actions
    const videoTemplate = path.resolve('./src/templates/playlistItems.js')
  
    const res = await graphql(`
      query {
        allTubeVideo {
          distinct(field: snippet___playlistId)
        }
      } 
    `)
    console.log(res.data); 
    res.data.allTubeVideo.distinct.map(playlist => {
      createPage({
          component: videoTemplate,
          path: `playlist/${playlist}`,
          context: {
            slug: playlist
          }
      })
    })
  }