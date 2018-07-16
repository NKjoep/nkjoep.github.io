const notifier = require('node-notifier');
const path = require('path');

const message = process.argv[2] || 'Blog recompiled';

let config;
try {
  config = require('../package.json').metalsmith.metadata;
} catch (err) {
  console.log(err);
  // var e = Error('pippo');
  notifier.notify({
    title: 'Microsmith Error',
    message: `Invalid or missing configuration file (${err.name})` ,
    timeout: 6,
    sound: true,
  });
  process.exit(1);
}

notifier.notify({
  title: config.site.title,
  timeout: 2,
  message: message,
  icon: path.join(__dirname, '../../assets/ico/favicon.png'), // Absolute path (doesn't work on balloons)
  sound: false, // Only Notification Center or Windows Toasters
  // wait: true // Wait with callback, until user action is taken against notification
});
