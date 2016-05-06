'use strict';

import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => { // ({video, onVideoSelect}) is the same as using: const video = props.video; and const onVideoSelect = props.onVideoSelect;
    const imageURL = video.snippet.thumbnails.default.url;
    return (
        <li className="list-group-item" onClick={() => onVideoSelect(video)}>
            <div className="video-item media">
                <div className="media-left">
                    <img className="media-object" src={imageURL}/>
                </div>
                <div className="media-body">
                    <div className="media-heading">
                        {video.snippet.title}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default VideoListItem;