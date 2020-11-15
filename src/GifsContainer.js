import React, { Component } from 'react';
import './css/GifsContainer.css'

class GifsContainer extends Component {
  

    render() {
        const gifs = this.props.gifs.map((gif, i) =>
            <figure key={i}
                className="effect-sarah">
                <span>
                    <img src={gif} alt="" />
                </span>
               
            </figure>
        );

        return (
            <div className="grid">
                {gifs}
            </div>
        );
    }
}

export default GifsContainer;