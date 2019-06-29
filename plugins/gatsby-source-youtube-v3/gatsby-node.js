const fetch = require("node-fetch")
const queryString = require("query-string")

 module.exports.onCreateNode = ({node, actions}) => {
  const { createNode, createNodeField} = actions
  if(node.internal.type === "tubeVideo") {
    console.log(JSON.stringify(node, undefined, 4));
  }
  
} 

module.exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // plugin code goes here...
  console.log("Testing my plugin", configOptions)

  // Convert the options object into a query string
  const apiOptions = queryString.stringify(configOptions)
  const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?${apiOptions}`;
  
  // Helper function that processes a content to match Gatsby's node structure
  const processContent = content => {
    const nodeId = createNodeId(`youtube--${content.id}`)
    const nodeContent = JSON.stringify(content)
    const nodeData = Object.assign({}, content, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `tubeVideo`,
        content: nodeContent,
        contentDigest: createContentDigest(content),
      },
    })
    return nodeData
  }

  return(
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        return Promise.all(
          data.items.map(item => {
            let playlistApiOption = queryString.stringify({
              part: 'snippet,contentDetails',
              key: 'AIzaSyDPdlc3ctJ7yodRZE_GfbngNBEYbdcyys8',
              playlistId: item.id,
              fields: 'items',
              maxResults: 50
            });
            let playlistApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?${playlistApiOption}`;

            return (
              fetch(playlistApiUrl)
                .then(res => res.json())
                .then(data => {
                  data.items.map(video => {
                    const nodeData = processContent(video);
                    createNode(nodeData);
                  })
                })
            )
          })
        )
      })
  )
}

  /*  */
  





 
 /*  const res = await fetch(apiUrl);
  const playlists = await res.json();
 // console.log(playlists)
  const getPlaylistVideos = (data=[]) => {
    playlists.items.forEach(playlist => {
      let playlistApiOption = queryString.stringify({
        part: 'snippet,contentDetails',
        key: 'AIzaSyDPdlc3ctJ7yodRZE_GfbngNBEYbdcyys8',
        playlistId: playlist.id,
        fields: 'items(id,snippet(title,description,thumbnails),contentDetails)'
      });
      let playlistApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?${playlistApiOption}`;
      fetch(playlistApiUrl)
          .then(res => res.json())
          .then(content => {
            console.log(content.items)
            content.items.forEach(item => {
              data.push(item.snippet.title)
              //console.log('push',data)
            })
            return data
            console.log('Gn',data)
          })
    })
    console.log('gn',data)
    return data
  }

  const createNodes = async () => {
    const data = await getPlaylistVideos();
    console.log('cN',data);
    data.forEach(item => {
      if (item.id !== undefined) {
        const nodeData = processContent(item)
        console.log(nodeData);
        createNode(nodeData)
      }
    })
  }

  function jk(){
    createNodes(),
    console.log('j');
  }

  return (
    jk()
   */