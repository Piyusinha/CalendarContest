const { CronJob } = require('cron');

const server = require('./server');
const runner = require('./runner');
const port = process.env.PORT|| 3000;
// Set up job that'll run runner every 10 minutes
new CronJob('*/10 * * * *', runner).start();

// Run runner once now
runner();


server.listen(process.env.PORT||3000);
