import React from 'react';
import VideoListItem from './videoListItem';

const VideoList = (props) => {
	// this code below means, go through the array by using the map function,
	// for each video in the videos array, send that video as a prop for the videoListItem
	const videoItems = props.videos.map((video) => {
		
		return (
			<VideoListItem 
				onVideoSelect={props.onVideoSelect}
				key={video.etag} 
				video={video} />
		);

	});

	return (
		<ul className="col-md-4 list-group">
			{videoItems}
		</ul>
	);
};

export default VideoList;