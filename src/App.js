import React, { Component } from 'react';
//import { throttle } from 'throttle-debounce';
import './css/App.css';
import Search from './Search';
import Functionalities from './Functionalities';
import Modal from './Modal'
import search from './giphy.png';
import InfiniteScroll from 'react-infinite-scroll-component';
var GphApiClient = require('giphy-js-sdk-core')

const modalStyle = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0,0)"
    }
};
class App extends Component {

    constructor() {
        super();
        this.state = {
            giphy: GphApiClient("8XADJBZWvzB75qIDyCpfWLbnE5otD7wG"),
            searchQuery: "",
            gifs: [],
            gifsOffset: 0,
            hasMore: true
          
        };
        this.search = this.search.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
         this.loadMore = this.loadMore.bind(this);

    }

    componentDidMount() {   
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
    

   

    loadMore()
    {
        this.setState({
            gifsOffset:this.state.gifsOffset+25
        })
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
    
        this.setState({
            searchQuery: event.target.value
        });
        
        this.search(event);
       
    }
    handleOpenModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            isModalOpen: false
        })
    }
   

    render() {
        return (
            
            <div>
                 <Modal
            isModalOpen={this.state.isModalOpen}
            closeModal={this.handleCloseModal}
            style={modalStyle}>
                
                <Search query={this.state.searchQuery} search={this.search} handleChange={this.updateQuery} />   
                

              
                    <InfiniteScroll style={{marginTop:'15px',overflowX:'hidden'}}
                        dataLength={this.state.gifs.length}
                        next={this.loadMore}
                        height='300px'
                        hasMore={true}
                         scrollThreshold={0.9}
                        >
                             <Functionalities gifs={this.state.gifs}  />
                        </InfiniteScroll>
                    </ Modal >
                    <button onClick={this.handleOpenModal}
                     style={{marginTop:'420px',marginLeft:'320px'}}>
                        <img src={search} alt="" style={{ width: '30px', height: '30px'}} />
                    </button>
                    
            </div>
        );
    }
}

export default App;
