import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Notifications extends React.Component {
  createNotification (type){
    //return () => {
      switch (type) {
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

  render() {
   return (
     <div>
       <button className='btn btn-info'
         onClick={this.createNotification('info')}>Info
       </button>
       <hr/>
       <button className='btn btn-success'
         onClick={this.createNotification('success')}>Success
       </button>
       <hr/>
       <button className='btn btn-warning'
         onClick={this.createNotification('warning')}>Warning
       </button>
       <hr/>
       <button className='btn btn-danger'
         onClick={this.createNotification('error')}>Error
       </button>

       <NotificationContainer/>
     </div>
   );
 }
}
export default Notifications
