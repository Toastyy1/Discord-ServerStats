const schedule = require('node-schedule');

module.exports = {
    execute: (client) => {
        // Run this job every 2 hours
        const updateMemberCountJob = schedule.scheduleJob('* * * * *', () => {
            require('../options/jobs/updateMemberCount').execute(client);
        });
    }
}
