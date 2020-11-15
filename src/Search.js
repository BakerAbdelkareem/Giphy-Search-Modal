import React, { Component } from 'react';
import './css/Search.css'

class Search extends Component {
    render() {
        return (   
                          
                                <input type="text" placeholder="Enter the word"
                                    value={this.props.query} onChange={this.props.handleChange} />                   
        );
    }
}

export default Search;
