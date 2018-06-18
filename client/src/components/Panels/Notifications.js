/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import FontAwesome from 'react-fontawesome';
//import { Badge } from 'reactstrap';
//import Timeago from 'react-timeago';
//import { MenuBar} from '../CountHeader/MenuBar'
//import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getChaincodes as getChaincodesCreator } from '../../store/actions/chaincodes/action-creators';
//import Channels from '../Lists/Channels';
import { getBlockList as getBlockListCreator } from '../../store/actions/block/action-creators';
import { getTransactionInfo as getTransactionInfoCreator } from '../../store/actions/transaction/action-creators';
import { getLatestBlock as getLatestBlockCreator } from '../../store/actions/latestBlock/action-creators';
import { getHeaderCount as getCountHeaderCreator } from '../../store/actions/header/action-creators';
import { getTransactionList as getTransactionListCreator } from '../../store/actions/transactions/action-creators';
import { getUUIDStatusRow as getUUIDStatusRowCreator } from '../../store/actions/matcheduuid/action-creators';
import { getUUIDStatusList as getUUIDStatusListCreator } from '../../store/actions/matcheduuids/action-creators';
import {Button} from 'reactstrap';
import Blocks from '../Lists/Blocks';
import DashboardView from '../View/DashboardView';
import MatchedUUID from '../Lists/MatchedUUID';



const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    avatarBlue: {
        backgroundColor: '#29621e'
    }
});

class NotificationPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeView: 'DashboardView',
            activeTab: { dashboardTab: true, blocksTab: false, matchedUUIDTab: false },
            blockHeight: 0,
            uuidHeight: 0,
            blockAddedCalled: 0,
            uuidMatchedCalled: 0,
            notificationTrigger: 0
        }

        this.makeNotificationTriggerOne = this.makeNotificationTriggerOne.bind(this);
        this.makeBlockAddedOne = this.makeBlockAddedOne.bind(this);
        this.makeUUIDMatchedCalledOne = this.makeUUIDMatchedCalledOne.bind(this);
        this.handleClickBlockView = this.handleClickBlockView.bind(this);
        this.handleClickMatchedUUIDView = this.handleClickMatchedUUIDView.bind(this);
        this.handleClickDashboardView = this.handleClickDashboardView.bind(this);
        this.avatarIcon = this.avatarIcon.bind(this);
    }
    handleData(data) {

    }

    makeNotificationTriggerOne(){
        this.setState({ notificationTrigger: (this.state.notificationTrigger = 1) });
    }

    makeBlockAddedOne(){
        this.setState({ blockAddedCalled: (this.state.blockAddedCalled = 1) });
    }

    makeUUIDMatchedCalledOne(){
        this.setState({ uuidMatchedCalled: (this.state.uuidMatchedCalled = 1) });
    }

    handleClickBlockView() {
      this.setState({ activeView: 'BlockView' });
      this.setState({
        activeTab: {
          dashboardTab: false,
          blocksTab: true,
          matchedUUIDTab: false
        }
      });
    }

    handleClickDashboardView() {
      this.setState({ activeView: 'DashboardView' });
      this.setState({
        activeTab: {
          dashboardTab: true,
          blocksTab: false,
          matchedUUIDTab: false
        }
      });
    }

    handleClickMatchedUUIDView = () => {
      this.setState({ activeView: 'MatchedUUIDView' });
      this.setState({
        activeTab: {
          dashboardTab: false,
          blocksTab: false,
          matchedUUIDTab: true
        }
      });
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.countHeader) !== JSON.stringify(this.props.countHeader)) {
          // console.log('nextProps.countHeader !== this.props.countHeader')
          this.setState({ countHeader: nextProps.countHeader });
      }

        if (this.state.blockHeight !== this.props.countHeader.latestBlock){
            this.makeNotificationTriggerOne();
            this.makeBlockAddedOne();
            this.setState({ blockHeight: this.props.countHeader.latestBlock });
        }

        if (this.state.uuidHeight !== this.props.uuidList.length) {
            this.makeNotificationTriggerOne();
            this.makeUUIDMatchedCalledOne();
            this.setState({ uuidHeight: this.props.uuidList.length });
        }
    }

    componentDidMount() {
      setInterval(() => {
        this.props.getCountHeader(this.props.channel.currentChannel);
        this.props.getLatestBlock(this.props.channel.currentChannel, 0);
        this.props.getUUIDStatusList(this.props.channel.currentChannel);
      }, 3000)
    }

    avatarIcon(type, classes) {
        switch (type) {
            case 'block':
                return (<Avatar className={classes.avatarBlue}><FontAwesome name="cube" /> </Avatar>);
                break;
            default:
                return (<Avatar ><FontAwesome name="exclamation" /> </Avatar>);
                break;
        }
    }

    wasBlockAddedNotification(){
        if ( this.state.blockAddedCalled === 1) {
            return(
                // <div className={classes.root} >
                //      <List component="nav">
                        <li button>
                            <Button active={ this.state.activeTab.blocksTab } onClick={ this.handleClickBlockView } style={{ background: 'darkgreen', fontSize: 15, borderColor: 'darkgreen' }}>
                                <p> Block Added!! </p>
                                <p> Click for more details </p>
                            </Button>
                        </li>
                     //</List>
                //</div>
            );
        }
    }

    wasUUIDMatchedNotifucation(){
        if ( this.state.uuidMatchedCalled === 1) {
            return(
                // <div className={classes.root} >
                //  <List component="nav">
                        <li button>
                            <Button active={ this.state.activeTab.matchedUUIDTab } onClick={ this.handleClickMatchedUUIDView } style={{ background: 'darkgreen', fontSize: 15, borderColor: 'darkgreen' }} >
                                <p> UUID Matched!! </p>
                                <p>Click for more details</p>
                            </Button>
                        </li>
            );
        }
    }

    // listOfNotifications(props){
    //     const list = props.list;
    //     const listNotifications = list.map((notify) =>
    //     <li key=
    //     }

    render() {
        let currentView = null;
        switch (this.state.activeView) {
          case 'BlockView':
            currentView = <Blocks blockList={this.props.blockList} channel={this.props.channel} countHeader={this.props.countHeader} getBlockList={this.props.getBlockList} transaction={this.props.transaction} getTransactionInfo={this.props.getTransactionInfo} />;
            break;
          case 'DashboardView':
            currentView = <DashboardView />;
            break;
          case 'MatchedUUIDView':
            currentView = <MatchedUUID channel={this.props.channel} countHeader={this.props.countHeader} uuidList={this.props.uuidList.rows} getUUIDStatusList={this.props.getUUIDStatusList} uuid={this.props.uuid} getUUIDStatusRow={this.props.getUUIDStatusRow}/>;
            break;
          default:
            currentView = <DashboardView />;
            break;
        }

        const { classes } = this.props;
        if ( this.state.notificationTrigger === 1 ) {
            return (
                <div className={classes.root} >
                        <ul component="nav">
                            <li>
                                <Typography variant="title"> Notifications: Trig: {this.state.notificationTrigger} Block:{this.state.blockAddedCalled} AND UUID:{this.state.uuidMatchedCalled}</Typography>
                                {this.wasBlockAddedNotification()}
                                {this.wasUUIDMatchedNotification()}
                            </li>
                        </ul>
                </div>

                // if ( this.state.blockAddedCalled === 1) {
                //         <div className={classes.root} >
                //              <List component="nav">
                //                 <ListItem button>
                //                     <Button active={ this.state.activeTab.blocksTab } onClick={ this.handleClickBlockView } style={{ background: 'darkgreen', fontSize: 15, borderColor: 'darkgreen' }}>
                //                         <p> Block Added!! </p>
                //                         <p>Click for more details</p>
                //                     </Button>
                //                 </ListItem>
                //              </List>
                //         </div>
                //     }}

                // if ( this.state.uuidMatchedCalled === 0) {
                //     <div className={classes.root} >
                //      <List component="nav">
                //             <ListItem button>
                //                 <Button active={ this.state.activeTab.matchedUUIDTab } onClick={ this.handleClickMatchedUUIDView } style={{ background: 'darkgreen', fontSize: 15, borderColor: 'darkgreen' }} >
                //                     <p> UUID Matched!! </p>
                //                     <p>Click for more details</p>
                //                 </Button>
                //             </ListItem>
                //     </List>
                // }
                // </List>
                // </div>
            );
        }

        return (
            <div className={classes.root} >
                <List component="nav">
                    <ListItem button>
                        <Typography variant="title"> No New Notifications</Typography>
                    </ListItem>
                </List>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    getLatestBlock: (curChannel) => dispatch(getLatestBlockCreator(curChannel)),
    getBlockList: (channel, offset) => dispatch(getBlockListCreator(channel, offset)),
    getChaincodes: (channel, offset) => dispatch(getChaincodesCreator(channel, offset)),
    getChannel: (channel, offset) => null,
    getChannelList: (offset) => null,
    getCountHeader: (curChannel) => dispatch(getCountHeaderCreator(curChannel)),
    getPeerList: (curChannel) => null,
    getTransactionInfo: (curChannel, tx_id) => dispatch(getTransactionInfoCreator(curChannel, tx_id)),
    getTransactionList: (curChannel, offset) => dispatch(getTransactionListCreator(curChannel, offset)),
    getUUIDStatusRow: (curChannel) => dispatch(getUUIDStatusRowCreator(curChannel)),
    getUUIDStatusList: (curChannel) => dispatch(getUUIDStatusListCreator(curChannel))
});

const mapStateToProps = state => ({
    block: state.block.block,
    blockList: state.blockList.blockList,
    chaincodes: state.chaincodes.chaincodes,
    channel: state.channel.channel,
    channelList: state.channelList.channelList,
    countHeader: state.countHeader.countHeader,
    peerList: state.peerList.peerList,
    transaction: state.transaction.transaction,
    transactionList: state.transactionList.transactionList,
    uuid: state.uuid.uuid,
    uuidList: state.uuidList.uuidList
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(NotificationPanel);
