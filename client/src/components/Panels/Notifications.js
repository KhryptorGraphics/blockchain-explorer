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
import MenuBar from '../CountHeader/MenuBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


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
        }
        this.avatarIcon = this.avatarIcon.bind(this);
    }
    handleData(data) {

    }
    componentWillReceiveProps(nextProps) {

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
        //this.props.notifications.length++;
        if (this.props.notifications.length === 0) {
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
        // else{

        // return (
        //     <div className={classes.root}>
        //         <List component="nav">
        //             <ListItem button>
        //                 <Typography variant="title"> No New Notifications</Typography>
        //                 <ToastContainer />
        //             </ListItem>
        //         </List>
        //     </div>
        // )
        // }

        return (
            <div className={classes.root}>
                <List component="nav">
                    {this.props.notifications.map(notify =>
                        <ListItem button>
                            {this.avatarIcon(notify.type, classes)}
                            <ListItemText primary={notify.title}
                                secondary={notify.message} />
                            <Badge>
                                <Timeago date={notify.time} live={false} minPeriod={60}/>
                            </Badge>
                        </ListItem>
                    )}
                </List>
            </div>
        );
    }

}
export default withStyles(styles)(NotificationPanel);
