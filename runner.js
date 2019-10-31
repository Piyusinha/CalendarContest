const axios = require('axios');
const cache = require('memory-cache');
const { flat, getCurrentTimeInSeconds } = require('./utils');

const codeforces = require('./fetcher/codeforces');
const hackerearth = require('./fetcher/hackerearth');
const hackerrank = require('./fetcher/hackerrank');
const topcoder = require('./fetcher/topcoder');
const leetcode = require('./fetcher/leetcode');
const codechef = require('./fetcher/codechef');
const atcoder = require('./fetcher/atcoder');
const csacademy = require('./fetcher/csacademy');
const coj = require('./fetcher/coj');


const runner = () => axios.all([
  codeforces(),
  hackerearth(),
  hackerrank(),
  topcoder(),
  leetcode(),
  codechef(),
  atcoder(),
  csacademy(),
  coj(),

])
  .then((contestsByPlatform) => {
    const contests = flat(contestsByPlatform.filter(it => Array.isArray(it)));

    const curTime = getCurrentTimeInSeconds();

    const sortByStartTime = (a, b) => a.startTime - b.startTime;
    const sortByEndTime = (a, b) => a.endTime - b.endTime;

    const isOngoing = contest => contest.startTime < curTime && contest.endTime > curTime;
    const isUpcoming = contest => contest.startTime > curTime && contest.endTime > curTime;

    const ongoingContests = contests.filter(isOngoing).sort(sortByEndTime);
    const upcomingContests = contests.filter(isUpcoming).sort(sortByStartTime);

    cache.put('results', {
      timestamp: curTime,
      ongoing: ongoingContests,
      upcoming: upcomingContests,
    });
  });

module.exports = runner;
