/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import TimeChart from './TimeChart';
import {
    TabContent, TabPane, Nav, NavItem, NavLink,
    Card, CardHeader, CardBody
} from 'reactstrap';
import {
    getBlocksPerMin as getBlocksPerMinCreator,
    getTxPerMin as getTxPerMinCreator,
    getBlocksPerHour as getBlocksPerHourCreator,
    getTxPerHour as getTxPerHourCreator
} from '../../store/actions/charts/action-creators'; import classnames from 'classnames';

class ChartStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            loading: false,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        }
        this.toggle = this.toggle.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.props.getBlocksPerMin(this.props.channel.currentChannel);
            this.props.getBlocksPerHour(this.props.channel.currentChannel);
            this.props.getTxPerMin(this.props.channel.currentChannel);
            this.props.getTxPerHour(this.props.channel.currentChannel);
            this.updateWindowDimensions();
            window.addEventListener('resize', this.updateWindowDimensions);
        }, 6000)
    }

    updateWindowDimensions() {
      this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }

    render() {
        return (
            <div className="chart-stats" >
                <Card>
                    <CardHeader>
                        <h5>Analytics</h5>
                    </CardHeader>
                    <CardBody className="tabsscale">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}>
                                    BLOCKS / HOUR
                     </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}>
                                    BLOCKS / MIN
                        </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); }}>
                                    TX / HOUR
                        </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '4' })}
                                    onClick={() => { this.toggle('4'); }}>
                                    TX / MIN
                        </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <TimeChart chartData={this.props.blockPerHour.blockPerHour} width={(this.state.windowWidth/2.78)-100} height={this.state.windowHeight/4.8} />
                            </TabPane>
                            <TabPane tabId="2">
                                <TimeChart chartData={this.props.blockPerMin.blockPerMin} width={(this.state.windowWidth/2.78)-100} height={this.state.windowHeight/4.8} />
                            </TabPane>
                            <TabPane tabId="3">
                                <TimeChart chartData={this.props.txPerHour.txPerHour} width={(this.state.windowWidth/2.78)-100} height={this.state.windowHeight/4.8} />
                            </TabPane>
                            <TabPane tabId="4">
                                <TimeChart chartData={this.props.txPerMin.txPerMin} width={(this.state.windowWidth/2.78)-100} height={this.state.windowHeight/4.8} />
                            </TabPane>
                        </TabContent>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getBlocksPerMin: (curChannel) => dispatch(getBlocksPerMinCreator(curChannel)),
    getBlocksPerHour: (curChannel) => dispatch(getBlocksPerHourCreator(curChannel)),
    getTxPerMin: (curChannel) => dispatch(getTxPerMinCreator(curChannel)),
    getTxPerHour: (curChannel) => dispatch(getTxPerHourCreator(curChannel))
});
const mapStateToProps = state => ({
    blockPerMin: state.blockPerMin,
    blockPerHour: state.blockPerHour,
    txPerMin: state.txPerMin,
    txPerHour: state.txPerHour,
    channel: state.channel.channel
});
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ChartStats);
