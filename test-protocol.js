const Id003 = require('./lib/id003.js');

const connection = Id003.factory({
  denominations: 'uah',
  rs232: {
    denominations: 'uah',
    device: '/dev/serial/by-id/usb-Prolific_Technology_Inc._USB-Serial_Controller-if00-port0',
    currency: 'uah',
  },
});

connection.run(() => {
  connection.enable();

  connection.on('billRead', data => {
    connection.reject();
    console.log('billRead', data);
  });
  connection.on('billValid', () => console.log('billValid'));
  connection.on('billRejected', () => console.log('billRejected'));
  connection.on('billRefused', () => console.log('billRefused'));
  connection.on('standby', data => console.log('standby', data));
  connection.on('stackerOpen', () => console.log('stackerOpen'));
  connection.on('error', err => console.log('error', err));
});

connection.id003Fsm.on('message', (cmd, data) => {
  console.log('message event', cmd, data);
});
