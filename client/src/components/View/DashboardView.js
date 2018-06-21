/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import ChartStats from '../Charts/ChartStats';
import PeerGraph from '../Charts/PeerGraph';
import TimelineStream from '../Lists/TimelineStream';
import OrgPieChart from '../Charts/OrgPieChart';
import {Row, Col} from 'reactstrap';
import { getHeaderCount as getCountHeaderCreator } from '../../store/actions/header/action-creators';
import { getTxByOrg as getTxByOrgCreator} from '../../store/actions/charts/action-creators';
import FontAwesome from 'react-fontawesome';

class DashboardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        setInterval(() => {
            this.props.getTxByOrg(this.props.channel.currentChannel);
        }, 10000)
    }

    componentWillReceiveProps(nextProps){
    }

    render() {
        return (
            <div className="dashboard" >
                <Row>
                    <Col lg="6">
                        <ChartStats />
                    </Col>
                    <Col lg="6">
                        <OrgPieChart txByOrg={this.props.txByOrg} clickCount={this.props.clickCount}/>
                    </Col>
                </Row>
                <Row className="lower-dash">
                    <Col lg="6">
                        <TimelineStream />
                    </Col>
                    <Col lg="6">
                        <PeerGraph />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCountHeader: (curChannel) => dispatch(getCountHeaderCreator(curChannel)),
    getTxByOrg: (curChannel) => dispatch(getTxByOrgCreator(curChannel) )
});
const mapStateToProps = state => ({
    countHeader: state.countHeader,
    txByOrg : state.txByOrg.txByOrg,
    channel : state.channel.channel
});
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(DashboardView);
