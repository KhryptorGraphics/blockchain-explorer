import React, { Component } from 'react';
import compose from 'recompose/compose';

 class Scaling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
     }

    componentDidMount() {
        setInterval(() => {
            this.updateWindowDimensions();
            window.addEventListener('resize', this.updateWindowDimensions);
        }, 6000)
    }

    updateWindowDimensions() {
      this.setState({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight
      });
    }

    render(){
        let gblWidth = {windowWidth};
        let gblHeight = {windowHeight};
        return(
            <div><Scaling width= 'gblWidth' height='gblHeight' /></div>
        );
    }

}

export default { Scaling, gblWidth, gblHeight };
