/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import FontAwesome from 'react-fontawesome';
import { Badge } from 'reactstrap';
import Timeago from 'react-timeago';
import { MenuBar} from '../CountHeader/MenuBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getChaincodes as getChaincodesCreator } from '../../store/actions/chaincodes/action-creators';

import { getBlockList as getBlockListCreator } from '../../store/actions/block/action-creators';

import { getTransactionInfo as getTransactionInfoCreator } from '../../store/actions/transaction/action-creators';

import { getLatestBlock as getLatestBlockCreator } from '../../store/actions/latestBlock/action-creators';

import { getHeaderCount as getCountHeaderCreator } from '../../store/actions/header/action-creators';

import { getTransactionList as getTransactionListCreator } from '../../store/actions/transactions/action-creators';

import { getUUIDStatusRow as getUUIDStatusRowCreator } from '../../store/actions/matcheduuid/action-creators';


import { getUUIDStatusList as getUUIDStatusListCreator } from '../../store/actions/matcheduuids/action-creators';



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
            blockHeight: 0,
            uuidHeight: 0,
            notificationTrigger: 0
        }
        this.avatarIcon = this.avatarIcon.bind(this);
    }
    handleData(data) {

    }
    componentWillReceiveProps(nextProps) {
        if (this.state.blockHeight != this.props.countHeader.latestBlock){
            this.setState({ notificationTrigger: 1});
            this.setState({ blockHeight: this.props.countHeader.latestBlock });
        }

        if (this.state.uuidHeight != this.props.uuidList.length) {
            this.setState({ notificationTrigger: 1});
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
                return (<Avatar ><FontAwesome name="exclamation" /> </Avatar>)
                break;
        }
    }
    render() {
        const { classes } = this.props;
        if (this.state.notificationTrigger === 0) {
            return (
                <div className={classes.root}>
                    <List component="nav">
                        <ListItem button>
                            <Typography variant="title"> No New Notifications</Typography>
                        </ListItem>
                    </List>
                </div>
            )
        }

        return (
            <div className={classes.root}>
                <List component="nav">
                    <Typography variant="title"> Got Here.</Typography>






                </List>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({

  getCountHeader: (curChannel) => dispatch(getCountHeaderCreator(curChannel)),
  getUUIDStatusRow: (curChannel) => dispatch(getUUIDStatusRowCreator(curChannel)),
  getUUIDStatusList: (curChannel) => dispatch(getUUIDStatusListCreator(curChannel))

});

const mapStateToProps = state => ({

  countHeader: state.countHeader.countHeader,
  uuid: state.uuid.uuid,
  uuidList: state.uuidList.uuidList

});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(NotificationPanel);
