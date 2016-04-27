import React from 'react'; // find the React library, which is in the project dependencies (node modules)
import ReactDOM from 'react-dom'; // better used for rendering HTML.
import SearchBar from './components/search_bar'; // importing the SearchBar component.

// key obtained from Youtube API key, used with npm package: youtube-api-search
const API_KEY = "AIzaSyAUpSHnrJfKRVVGBIJWGd3hjQJovS98_So";

// 1. Create a new React component to produce HTML.
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

// 2. Insert generated HTML into the DOM for user interaction.
// Render App into the DOM element which already exists in the HTML document (ex: <div class="container"></div>).
ReactDOM.render(<App />, document.querySelector(".container"));