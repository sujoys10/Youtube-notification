import React from 'react';
import { graphql } from 'gatsby';
import Video from '../components/video';

export const data =graphql`
        query ($slug: String!){
            allTubeVideo(filter: {snippet: {playlistId: {eq: $slug}}}) {
               edges {
                   node {
                       snippet {
                           playlistId
                           title
                           description
                       }
                       contentDetails {
                           videoId
                           videoPublishedAt
                       }
                   }
               }
           }
       }    
    `
    console.log(data)


export default (props) => {
    return(
        <div>
            <h1>Blog</h1>
            <ol>
                {
                   props.data.allTubeVideo.edges.map((edge,index) => {
                    return (
                        <div key={index}>
                            {console.log(edge.node.snippet.title)}
                            <h3>{edge.node.snippet.title}</h3>
                            <Video videoId={edge.node.contentDetails.videoId}/>
                        </div>
                    )
                })
                }
            </ol>
        </div>
    )
}
 

