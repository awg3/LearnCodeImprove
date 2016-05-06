'use strict';
import _ from 'lodash';
import React, {Component} from 'react'; // find the React library, which is in the project dependencies (node modules)
import ReactDOM from 'react-dom'; // better used for rendering HTML.
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'; // importing the SearchBar component.
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = "AIzaSyAUpSHnrJfKRVVGBIJWGd3hjQJovS98_So"; // key obtained from Youtube API key, used with npm package: youtube-api-search

/*
    Downwards data flow: most parent component should be responsible for obtaining data necessary for the child components.
    Our top level component: this file.
*/

/* 1. Create a new React component to produce HTML.
const App = () => { // a.k.a. as const App = function(){, the value of 'this' is different using => instead.
    return (
        <div>
            <SearchBar />
        </div>
    );
}
/* comments:
- const: ES6 concept, a constant which will never going to change.
         changing const will throw an error.
- HTML code within function: returns JSX, JSX is syntax which babel/webpack transcribes into vanilla JS.
- Purpose of JSX: allows our JS components to render dynamic HTML, among other things.
*/

// The above commented App component has been refactored from a functional component to a class based component.
class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            videos: [],
            selectedVideo: null
        };
        
        this.videoSearch('surfboards');
    }
    
    videoSearch(searchTerm){ // performs a youtube search
        YTSearch({key: API_KEY, term: searchTerm}, (videos) => { // ES6 callback function (=>) for the youtube API.
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }
    
    render(){ // passing the list of videos via a JSX props, which arrives to VideoList as an array of videos inside the props object
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300); // debounce takes a callback function which returns a new function that can only be called every 300ms
        
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <br/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})} // onVideoSelect is now a property of VideoList, which is equal to a call back function (selectedVideo), which in turn has the currently selected video as a parameter.
                    videos={this.state.videos} 
                />
            </div>
        );
    }
}
//*/
// 2. Insert generated HTML into the DOM for user interaction.
// Render App into the DOM element which already exists in the HTML document (ex: <div class="container"></div>).
ReactDOM.render(<App />, document.querySelector(".container"));