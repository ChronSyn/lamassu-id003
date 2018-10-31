const Id003 = require('../lib/id003.js');

const connection = Id003.factory({
  rs232: {
    device: '/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A50285BI-if00-port0',
    baudRate: 9600,
  },
});

connection.run(() => {
  connection.on('billRead', data => {
    console.log('billRead', data);
    connection.reject();
    // connection.stack();
  });
  connection.on('dispatch', data => console.log('dispatch', data));

  connection.on('billValid', () => console.log('billValid'));
  connection.on('billRejected', () => console.log('billRejected'));
  connection.on('billRefused', () => console.log('billRefused'));
  connection.on('standby', () => {
    console.log(connection.getVersion());
  });
  connection.on('stackerOpen', () => console.log('stackerOpen'));
  connection.on('error', err => console.log('error', err));
});
