/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { ScatterChart,Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Card, { CardContent } from 'material-ui/Card';
//import Scaling, { windowWidth, windowHeight } from '../../Scaling';
//

// class Scaling extends Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            windowWidth: window.innerWidth,
//            windowHeight: window.innerHeight
//        }
//         this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
//     }
//
//    componentDidMount() {
//        setInterval(() => {
//            this.updateWindowDimensions();
//            window.addEventListener('resize', this.updateWindowDimensions);
//        }, 6000)
//    }
//
//    updateWindowDimensions() {
//      this.setState({
//          windowWidth: window.innerWidth,
//          windowHeight: window.innerHeight
//      });
//    }
//
//    render()
// }

const TimeChart = ({ chartData }) => {
  var displayData = [];
  var dataMax = 0;

  if (chartData != null) {
    for (let i = 0; i < chartData.rows.length; i++) {
      var rec = chartData.rows[i];
      displayData[i] = { 'datetime': convertTime(rec.datetime), 'count': rec.count };
      if (parseInt(rec.count, 10) > dataMax) {
        dataMax = parseInt(rec.count, 10);
      }
    }
  }
  else {
    console.log("---null records for charts");
  }

  dataMax = dataMax + 5;
  return (
    <div>
      <Card >
        <CardContent >
          <ScatterChart width={570} height={145}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datetime" />
            <YAxis domain={[0, dataMax]} dataKey="count" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={displayData} fill="#29621e" line={{stroke: '#29621e', strokeWidth: 2}} />
          </ScatterChart>
        </CardContent>
      </Card>
    </div>
  );
  function convertTime(date) {
    var hold = new Date(date);
    var hours = hold.getHours();
    var minutes = hold.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}
export default TimeChart;
