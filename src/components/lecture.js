import React from 'react';
import Video from './video';

const Lecture = (props) => {
    console.log(props);
    const { 
        snippet: {
            title,
            description,
            thumbnails: {
                medium: img
            }
        },
        contentDetails: {
            videoId,
            videoPublishedAt
        }
    } = props.data;
    return(
        <div>
            <b>{title}</b>
            <Video videoId={videoId}/>
            <p>{description}</p>
        </div>
    )
}

export default Lecture;