import React from 'react';

const VideoDetail = ({video}) =>{
    if(!video){
        return <div>Loading ... </div>;
    }
    else {
        const videoId = video.id.videoId; // grabbing the video ID from the {video} object, from the App component.
        const url = `https://www.youtube.com/embed/${videoId}`; // creating a custom embed URL to be used in our iframe.

        return (
            <div className="video-detail col-lg-12 text-left">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={url}></iframe>
                </div>
                <div className="details">
                    <div>{video.snippet.title}</div>
                    <div>{video.snippet.description}</div>
                </div>
            </div>
        );
    }
}

export default VideoDetail;