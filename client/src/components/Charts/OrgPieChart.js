/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
// import Card, { CardContent } from 'material-ui/Card';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import txByOrg from '../../store/reducers/txByOrg';
import Scaling, { gblWidth, gblHeight } from '../../Scaling';

const colors = ['#0B091A','#29621e','#6ecd5b','#7C7C7C'];
class OrgPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { value: 43, name: "OrdererMSP", fill: "#0B091A" },
                { value: 60, name: "Org1MSP", fill: "#29621e" },
                { value: 23, name: "Org2MSP", fill: "#6ecd5b" }
            ]
            // ,
            // windowWidth: window.innerWidth,
            // windowHeight: window.innerHeight
        }
        // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillReceiveProps(nextProps){
        var temp = [];
        var index = 0;
        nextProps.txByOrg.forEach(element => {
            temp.push({value: parseInt(element.count), name: element.creator_msp_id,
            fill: colors[index]});
            index++;
        });
        this.setState({data:temp});
    }

    componentDidMount() {
        // setInterval(() => {
            // this.updateWindowDimensions();
            // window.addEventListener('resize', this.updateWindowDimensions);
        // }, 6000)
    }

    // updateWindowDimensions() {
    //     this.setState({
    //         windowWidth: window.innerWidth,
    //         windowHeight: window.innerHeight
    //     });
    // }

    render() {
        return (
            <div className="orgtxscaled">
                <Card>
                    <CardHeader>
                        <h5>Organization Transactions</h5>
                    </CardHeader>
                    <CardBody>
                        <PieChart width={this.state.windowWidth/3} height={this.state.windowHeight/5}>
                            <Legend align="right" height={15} />
                            <Pie data={this.state.data} dataKey="value" nameKey="name" cx="50%" cy="50%"  outerRadius={50} label fill="fill" />
                            <Tooltip />
                        </PieChart>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default OrgPieChart;
