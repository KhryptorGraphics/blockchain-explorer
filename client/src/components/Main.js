/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './Layout/index';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout activeView={this.props.activeView}/>
            </div>
        )
    }
}

export default Main;
