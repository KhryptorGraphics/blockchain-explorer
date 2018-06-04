import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "warning"
        }

        this.createNotification = this.createNotification.bind(this);
    }

  createNotification = () => {
      switch (this.state.type) {
        case 'info':
          return NotificationManager.info('Info message');
          break;
        case 'success':
          return NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          return NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          return NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
  };

  componentWillReceiveProps(nextProps) {
      this.setState({ type: this.props.type });
      this.createNotification();
  }

  render() {
   return (
     <div>
       <NotificationContainer/>
     </div>
    );
    };

 // <button className='btn btn-success'
 // onClick={Notifications.createNotification('success')}>Success
 // </button>
}
export default Notifications;
