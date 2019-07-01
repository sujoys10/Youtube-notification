import React from 'react';

const Video = ({videoId}) => {
    console.log(videoId)
    return (
        <div className="video">
        <iframe
            title={videoId}
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
        />
        </div>
    )
}

export default Video;
    