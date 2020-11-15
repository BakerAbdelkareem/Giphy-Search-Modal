import React, { Component } from 'react';
import { throttle } from 'throttle-debounce';
import './css/App.css';
import Search from './Search';
import Functionalities from './Functionalities';

var GphApiClient = require('giphy-js-sdk-core')

class App extends Component {

    constructor() {
        super();
        this.state = {
            giphy: GphApiClient("8XADJBZWvzB75qIDyCpfWLbnE5otD7wG"),
            searchQuery: "",
            gifs: [],
            gifsOffset: 0
          
        };

        this.infiniteScroll = throttle(1000, this.infiniteScroll);
        this.infiniteScroll = this.infiniteScroll.bind(this);

        this.search = this.search.bind(this);
        this.updateQuery = this.updateQuery.bind(this);

    }

    componentDidMount() {
        window.addEventListener('scroll', this.infiniteScroll);
        this.loadFeed();
    }

    loadFeed() {
        this.state.giphy.trending("gifs", { "offset": this.state.gifsOffset })
            .then((response) => {
                response.data.forEach((gif) => {
                    let newArray = this.state.gifs.slice();
                    newArray.push(gif.images.fixed_height_downsampled.gif_url);
                    
                    this.setState({
                        gifs: newArray
                    });
                })
            })
          
    }
    infiniteScroll() {
        if ((window.innerHeight + window.scrollY) < (document.body.scrollHeight - 600))
            return;

        else
            this.scrollFeed();
    }

    scrollFeed() {
        this.setState({
            gifsOffset: this.state.gifsOffset + 25
        });
        this.loadFeed();
    }

    search(event) {
        event.preventDefault();

        if (this.state.searchQuery.trim() === "")
            return;

        this.state.giphy.search('gifs', { "q": this.state.searchQuery })
            .then((response) => {
                this.setState({
                    gifs: []
                });

                response.data.forEach((gif) => {
                    let newArray = this.state.gifs;
                    newArray.push(gif.images.fixed_height_downsampled.gif_url);

                    this.setState({
                        gifs: newArray
                    });
                })
            })
            
    }

    updateQuery(event) {
       // event.stopPropagation();
        this.setState({
            searchQuery: event.target.value
        });
        
        this.search(event);
       
    }

    render() {
        return (
            <section>
                <Search query={this.state.searchQuery} search={this.search} handleChange={this.updateQuery} />   
                <Functionalities gifs={this.state.gifs}  
                    />
            </section>
        );
    }
}

export default App;
