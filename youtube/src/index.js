import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/searchBar';
import VideoList from './components/videoList';
import VideoDetail from './components/videoDetail';


// create a new component. This component should product some html

const YOUTUBE_API_KEY = "AIzaSyBUj2aMlhwggYquK3WOvmVOc6Iufd_x5Ao";


class App extends Component {

	constructor(props) {
		super(props);

		this.state = { 
			videos: [], 
			selectedVideo: null
		}

		this.videoSearch('real madrid');

	}

	videoSearch(searchTerm) {
		YTSearch({ key: YOUTUBE_API_KEY, term: searchTerm}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((searchTerm) => { this.videoSearch(searchTerm)}, 300);

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos}/>
			</div>
		)
	}

}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));