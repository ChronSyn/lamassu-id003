const Id003 = require('../lib/id003.js');

const connection = Id003.factory({
  rs232: {
    device: '/dev/serial/by-id/usb-Prolific_Technology_Inc._USB-Serial_Controller-if00-port0',
  },
});

connection.run(() => {
  connection.enable();
  // connection.disable();
  // connection.lightOff();
  // connection.lightOn();
  // connection.isCashboxOut();
  // connection.refresh();

  connection.on('billRead', data => {
    console.log('billRead', data);
    connection.reject();
    // connection.stack();
  });
  connection.on('billValid', () => console.log('billValid'));
  connection.on('billRejected', () => console.log('billRejected'));
  connection.on('billRefused', () => console.log('billRefused'));
  connection.on('standby', data => console.log('standby', data));
  connection.on('stackerOpen', () => console.log('stackerOpen'));
  connection.on('error', err => console.log('error', err));
});
