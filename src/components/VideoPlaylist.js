/* import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export default () => {
    const data = useStaticQuery(graphql`
    allYoutubeVideo {
        edges {
          node {
            id
            title
            description
            videoId
            publishedAt
            privacyStatus
          }
        }
      }
    `)

    return(
        <div>
            Youtube
            {console.log(data)}
        </div>
    )
}
 */