import React, { Component } from 'react';
import GifsContainer from './GifsContainer';

class Functionalities extends Component {
    render() {
        return (
            
                <div>                
                 <GifsContainer gifs={this.props.gifs}  />        
                </div>
         
        );
    }
}

export default Functionalities;