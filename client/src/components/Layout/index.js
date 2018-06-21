/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import MenuBar from '../CountHeader/MenuBar';
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = { page: 'index.js', description: 'Main layout', clickCount: 0 };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ activeView: 'DashboardView', clickCount: this.state.clickCount + 1 });
    }
    render() {
        return (
            <MenuBar activeView={this.state.activeView} clickCount={this.state.clickCount}/>
        );
    }
}

export default Layout;
