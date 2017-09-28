const Id003 = require('../lib/id003.js');
// const SerialPort = require('serialport');

// const serial = new SerialPort('/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A50285BI-if00-port0', {
//   baudRate: 115200,
//   autoOpen: false,
// });

// serial.open(err => {
//   console.log('Open', err);
//   serial.on('data', data => {
//     console.log('data');
//   });
// });

// setTimeout(() => {
//   serial.close();
// }, 5000);

const connection = Id003.factory({
  rs232: {
    device: '/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A50285BI-if00-port0',
    baudRate: 9600,
  },
});

connection.run(() => {
  connection.rs232.serial.on('data', data => {
    console.log('messages', data);
  });

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
